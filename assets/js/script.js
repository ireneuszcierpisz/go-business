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
    document.getElementById("nOfPeriods").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            console.log("Enter key pressed on input field!");
            let nOfPeriods = parseInt(document.getElementById("nOfPeriods").value);
            console.log("Got number of periods: " + nOfPeriods);
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

        }
    });
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
        nOfPeriods = parseInt(document.getElementById("nOfPeriods").value);
        if (isNaN(nOfPeriods)) { alert(`Unknown number of years!`); }
        console.log("Got number of periods: " + nOfPeriods);

        capital = parseInt(document.getElementById("capital").value);
        if (isNaN(capital)) { alert(`Unknown value of capital!`); }
        console.log("Got capital: " + capital + typeof capital);

        machine = parseInt(document.getElementById("machine").value);
        if (isNaN(machine)) { alert(`Unknown value of machine!`); }
        console.log("Got machine value: " + machine);

        discountRate = parseInt(document.getElementById("discountRate").value);
        if (isNaN(discountRate)) { alert(`Unknown value of discountRate!`); }
        console.log("Got discount rate: " + discountRate + '%');

        depreciation = parseInt(document.getElementById("depreciation").value);
        if (isNaN(depreciation)) { alert(`Unknown value of depreciation!`); }
        console.log("Got depreciation: " + depreciation + '%');

        if (document.getElementById('sales-costs').innerHTML === '') { alert(`Please fill in and press enter in the field of the number of years of investment!`); }
        let sales = [];
        let costs = [];
        for (let i = 0; i < nOfPeriods - 1; i++) {

            let sale = parseInt(document.getElementById('sales').children[i].value);
            if (isNaN(sale)) { alert(`Unknown value of sale!`); }
            sales.push(sale);

            let cost = parseInt(document.getElementById('costs').children[i].value);
            if (isNaN(cost)) { alert(`Unknown value of cost!`); }
            costs.push(cost);

        }
        console.log('Looking for sales data, found: ' + sales);
        console.log('sales length: ' + sales.length);
        console.log('Looking for costs data, found: ' + costs);

        //makes arrays of sales, costs and profits
        let profitArray = [-(capital + machine)];
        let releasedValue = (machine * ((100 - depreciation) / 100)) + capital;
        console.log("releasedValue: " + releasedValue);
        for (let i = 0; i < nOfPeriods - 1; i++) {
            profitArray.push(sales[i] - costs[i]);
        }
        profitArray[nOfPeriods - 1] += releasedValue;
        console.log("profitArray: " + profitArray);


        let discountFactorArray = [1];
        for (let i = 1; i < nOfPeriods; i++) {
            discountFactorArray.push(Math.pow(1 + discountRate / 100, -i).toFixed(3));
        }
        console.log("discountFactorArray: " + discountFactorArray);

        let npvArray = [];
        for (let i = 0; i < nOfPeriods; i++) {
            npvArray.push(parseInt(profitArray[i] * discountFactorArray[i]));
        }
        console.log("npvArray: " + npvArray);

        let npv = 0;
        for (let i = 0; i < npvArray.length; i++) {
            npv += npvArray[i];
        }
        console.log('npv: ' + npv);

        if (npv > 0) {
            document.getElementById("message").innerHTML = `<b>You sent data! See your NPV</b>: <h3 style="font-family:sans-serif; color:blue; border:1px solid grey; background-color:whitesmoke; width: auto; height:auto; text-align:center; padding: 4px 1.5rem; display:inline-block;">+${npv}</h3><p style="display:inline-block; margin-left:10px;"><span style="padding:0 5px;"></span><b>Your intuition is great! You are the winner!</b></p>`;
            console.log('final message "winner" shown!');
        } else {
            document.getElementById("message").innerHTML = `<b>You sent data! See your NPV</b>: <h3 style="font-family:sans-serif; color:red; border:1px solid grey; background-color:whitesmoke; width: auto; height:auto; text-align:center; padding: 4px 1.5rem; display:inline-block;">${npv}</h3><p style="display:inline-block; margin-left:10px"><span style="padding:0 5px;"></span><b>You will lose money! Try again!</b></p>`;
            console.log('final message "try-again" shown!');
        }

    });

}

