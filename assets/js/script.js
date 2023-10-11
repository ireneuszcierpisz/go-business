function mouseOver(domObj) {
    if (domObj.id == "check-button") {
        domObj.style.backgroundColor = '#FFD700';
    }
    else { domObj.style.backgroundColor = '#AFEEEE'; }
}

function mouseOut(domObj) {
    if (domObj.id == "check-button") {
        domObj.style.backgroundColor = 'yellow';
    }
    else { domObj.style.backgroundColor = '#E0FFFF'; }
}

// Wait for the DOM to finish loading before running the script

document.addEventListener("DOMContentLoaded", function () {

    showSalesCostsFields();

    collectData();

});

// Assign DOM elements to constants
const workingCapital = document.getElementById("capital");
const machinery = document.getElementById("machine");
const periods = document.getElementById("nOfPeriods");
const checkButton = document.getElementById("check-button");
const errMsg = document.getElementById("err-msg");
const salesCosts = document.getElementById("sales-costs");
const discount = document.getElementById("discountRate");
const machineDepreciation = document.getElementById("depreciation");

/**
 * Get HTML element and add event listeners to it
 * Gets the value directly from the DOM
 * Inject new elements to index.html using template literals
 */
function showSalesCostsFields() {
    checkButton.addEventListener("click", function () {
        let nOfPeriods = parseInt(periods.value);
        errMsg.innerHTML = '';
        let tip = " (Number from 3 to 10 required)";
        let inputValid = false;
        try {
            if (isNaN(nOfPeriods) || nOfPeriods < 3 || nOfPeriods > 10)
                throw "Enter the correct value and click the red button! ";
            else tip = "";
            checkButton.style.backgroundColor = '#7FFF00';
            checkButton.innerHTML = 'OK!';
            inputValid = true;
        }
        catch (err) {
            errMsg.innerHTML = err + tip;
            checkButton.style.backgroundColor = '#FF7F50';
            checkButton.innerHTML = 'Error';
        }

        if (inputValid) {
            let html4inputs = ``;
            for (let i = 1; i < nOfPeriods; i++) {
                html4inputs += `
                    Year ${i} <input type="number" required min="0"/>   
                    `;
            }
            salesCosts.innerHTML = `
                    <p>You entered duration of the business ${nOfPeriods} years (Note that the investment year is year zero).  Now complete next necessary data, please. Enter the values ​​of planned sales and costs starting from year one.</p>
                    <p>First your assumptions about <b>sales</b> in the following years:</p>
                    <p id="sales">` + html4inputs + `</p>`
                + `<p> Here your assumptions about <b>costs:</b></p>
                    <p id="costs">` + html4inputs + `</p>`;
        } else {
            salesCosts.innerHTML = "";
        }
    }
    );
}

/**
 * Add event listener to the button
 * Get values from DOM elements
 * Add alerts to the inputs
 * Make calculations of the NPV
 * Insert new html elements in 'answer' div
 * Launch the final message
 */
function collectData() {
    let capital, machine, nOfPeriods, discountRate, depreciation;
    let years = 0;
    document.getElementById("submit-button").addEventListener("click", function () {

        capital = parseInt(workingCapital.value);
        if (isNaN(capital) || capital < 5000) {
            workingCapital.value = "";
            workingCapital.focus();
            alert(`Invalid value of capital! Enter a number bigger than 5000.`);
            throw `Invalid value of capital!`;
        }

        machine = parseInt(machinery.value);
        if (isNaN(machine) || machine < 5000) {
            machinery.value = "";
            machinery.focus();
            alert(`Invalid value of machinery! Enter a number bigger than 5000.`);
            throw `Invalid value of machine!`;
        }

        nOfPeriods = parseInt(periods.value);
        if (isNaN(nOfPeriods) || nOfPeriods < 3 || nOfPeriods > 10) {
            periods.value = "";
            periods.focus();
            alert(`Invalid value for the number of years of investment! Enter a number from 3-10.`);
            throw `Invalid value for the number of years of investment!`;
        } else {
            if (years != nOfPeriods) {
                years = nOfPeriods;
                checkButton.style.backgroundColor = 'yellow';
                checkButton.innerHTML = 'Check!';
            }
        }

        discountRate = parseInt(discount.value);
        if (isNaN(discountRate) || discountRate < 1 || discountRate > 20) {
            discount.value = "";
            discount.focus();
            alert(`Invalid value of discountRate! Enter a number from 1-20.`);
            throw `Invalid value of discountRate!`;
        }

        depreciation = parseInt(machineDepreciation.value);
        if (isNaN(depreciation) || depreciation < 10 || depreciation > 100) {
            machineDepreciation.value = "";
            machineDepreciation.focus();
            alert(`Invalid value of machine depreciation! Enter a number from 10-100.`);
            throw `Invalid value of machine depreciation!`;
        }

        if (salesCosts.innerHTML === '') { alert(`Please fill in the field of the number of years of investment and click the yellow button!`); }
        //gets arrays of sales and costs
        let sales = [];
        let costs = [];
        const saleObj = document.getElementById('sales');
        const costObj = document.getElementById('costs');

        for (let i = 0; i < nOfPeriods - 1; i++) {
            let sale = parseInt(saleObj.children[i].value);
            if (isNaN(sale) || sale < 0) {
                saleObj.children[i].value = "";
                saleObj.children[i].focus();
                alert(`Invalid value of sale! Must be zero or greater.`);
                throw `Invalid value of sale!`;
            }
            sales.push(sale);

            let cost = parseInt(costObj.children[i].value);
            if (isNaN(cost) || cost < 0) {
                costObj.children[i].value = "";
                costObj.children[i].focus();
                alert(`Invalid value of cost! Must be zero or greater.`);
                throw `Invalid value of cost!`;
            }
            costs.push(cost);
        }

        //makes a profit array
        let profitArray = [-(capital + machine)];
        let releasedValue = (machine * ((100 - depreciation) / 100)) + capital;
        for (let i = 0; i < nOfPeriods - 1; i++) {
            profitArray.push(sales[i] - costs[i]);
        }
        profitArray[nOfPeriods - 1] += releasedValue;

        //gets discount factors for every period excluding year zero
        let discountFactorArray = [1];
        for (let i = 1; i < nOfPeriods; i++) {
            discountFactorArray.push(Math.pow(1 + discountRate / 100, -i).toFixed(3));
        }

        //gets NPV array for all periods
        let npvArray = [];
        for (let i = 0; i < nOfPeriods; i++) {
            npvArray.push(parseInt(profitArray[i] * discountFactorArray[i]));
        }

        //gets NPV value
        let npv = 0;
        for (let i = 0; i < npvArray.length; i++) {
            npv += npvArray[i];
        }

        //launch final message
        if (npv > 0) {
            document.getElementById("message").innerHTML = `<b>You sent data! See your NPV</b>: <h3 style="font-family:sans-serif; color:blue; border:1px solid grey; background-color:whitesmoke; width: auto; height:auto; text-align:center; padding: 4px 1.5rem; display:inline-block;">+${npv}</h3><p style="display:inline-block; margin-left:10px;"><span style="padding:0 5px;"></span><b>Your intuition is great! You are the winner!</b></p>`;
        } else {
            document.getElementById("message").innerHTML = `<b>You sent data! See your NPV</b>: <h3 style="font-family:sans-serif; color:red; border:1px solid grey; background-color:whitesmoke; width: auto; height:auto; text-align:center; padding: 4px 1.5rem; display:inline-block;">${npv}</h3><p style="display:inline-block; margin-left:10px"><span style="padding:0 5px;"></span><b>You will lose money! Try again! Change some assumptions.</b></p>`;
        }

    });

}