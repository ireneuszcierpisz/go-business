// Wait for the DOM to finish loading before running the script

document.addEventListener("DOMContentLoaded", function () {

    showSalesCostsFields();

    collectData();

});

/**
 * Get HTML element and add event listeners to it
 * Gets the value directly from the DOM
 * Inject new elements to index.html using template literals
 */
function showSalesCostsFields() {
    document.getElementById("check-button").addEventListener("click", function () {
        let nOfPeriods = parseInt(document.getElementById("nOfPeriods").value);
        document.getElementById("err-msg").innerHTML = '';
        let tip = " (Number from 3 to 10 required)";
        let ok = false;
        try {
            if (isNaN(nOfPeriods) || nOfPeriods < 3 || nOfPeriods > 10)
                throw "Enter the correct value and click the red button! ";
            else tip = "";
            document.getElementById('check-button').style.backgroundColor = '#7FFF00';
            document.getElementById('check-button').innerHTML = 'OK!';
            ok = true;
        }
        catch (err) {
            document.getElementById("err-msg").innerHTML = err + tip;
            document.getElementById('check-button').style.backgroundColor = '#FF7F50';
            document.getElementById('check-button').innerHTML = 'Error';
        }

        if (ok) {
            let html4inputs = ``;
            for (let i = 1; i < nOfPeriods; i++) {
                html4inputs += `
                    Year ${i} <input type="number" required min="0"/>   
                    `;
            }
            document.getElementById("sales-costs").innerHTML = `
                    <p>You entered duration of the business ${nOfPeriods} years (Note that the investment year is year zero).  Now complete next necessary data, please. Enter the values ​​of planned sales and costs starting from year one.</p>
                    <p>First your assumptions about <b>sales</b> in the following years:</p>
                    <p id="sales">` + html4inputs + `</p>`
                + `<p> Here your assumptions about <b>costs:</b></p>
                    <p id="costs">` + html4inputs + `</p>`;
        } else {
            document.getElementById("sales-costs").innerHTML = "";
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
    let nOfPeriods, capital, machine, discountRate, depreciation;
    document.getElementById("submit-button").addEventListener("click", function () {

        capital = parseInt(document.getElementById("capital").value);
        if (isNaN(capital) || capital < 5000) {
            document.getElementById("capital").value = "";
            document.getElementById("capital").focus();
            alert(`Invalid value of capital! Enter a number bigger than 5000.`);
            throw `Invalid value of capital!`;
        }

        machine = parseInt(document.getElementById("machine").value);
        if (isNaN(machine) || machine < 5000) {
            document.getElementById("machine").value = "";
            document.getElementById("machine").focus();
            alert(`Invalid value of machinery! Enter a number bigger than 5000.`);
            throw `Invalid value of machine!`;
        }

        nOfPeriods = parseInt(document.getElementById("nOfPeriods").value);
        if (isNaN(nOfPeriods) || nOfPeriods < 3 || nOfPeriods > 10) {
            document.getElementById("nOfPeriods").value = "";
            document.getElementById("nOfPeriods").focus();
            alert(`Invalid value for the number of years of investment! Enter a number from 3-10.`);
            throw `Invalid value for the number of years of investment!`;
        }

        discountRate = parseInt(document.getElementById("discountRate").value);
        if (isNaN(discountRate) || discountRate < 1 || discountRate > 20) {
            document.getElementById("discountRate").value = "";
            document.getElementById("discountRate").focus();
            alert(`Invalid value of discountRate! Enter a number from 1-20.`);
            throw `Invalid value of discountRate!`;
        }

        depreciation = parseInt(document.getElementById("depreciation").value);
        if (isNaN(depreciation) || depreciation < 10 || depreciation > 100) {
            document.getElementById("depreciation").value = "";
            document.getElementById("depreciation").focus();
            alert(`Invalid value of machine depreciation! Enter a number from 10-100.`);
            throw `Invalid value of machine depreciation!`;
        }

        if (document.getElementById('sales-costs').innerHTML === '') { alert(`Please fill in the field of the number of years of investment and click the yellow button!`); }
        //gets arrays of sales and costs
        let sales = [];
        let costs = [];
        for (let i = 0; i < nOfPeriods - 1; i++) {

            let sale = parseInt(document.getElementById('sales').children[i].value);
            if (isNaN(sale) || sale < 0) {
                document.getElementById('sales').children[i].value = "";
                document.getElementById('sales').children[i].focus();
                alert(`Invalid value of sale! Must be zero or greater.`);
                throw `Invalid value of sale!`;
            }
            sales.push(sale);

            let cost = parseInt(document.getElementById('costs').children[i].value);
            if (isNaN(cost) || cost < 0) {
                document.getElementById('costs').children[i].value = "";
                document.getElementById('costs').children[i].focus();
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