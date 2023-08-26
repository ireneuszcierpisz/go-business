document.addEventListener("DOMContentLoaded", function () {

    showSalesCostsFields();

    collectData();

});


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


function collectData() {
    let nOfPeriods, capital, machine, discountRate, depreciation;
    let sales = [];
    let costs = [];
    document.getElementById("submit-button").addEventListener("click", function () {
        nOfPeriods = parseInt(document.getElementById("nOfPeriods").value);
        console.log("Got number of periods: " + nOfPeriods);
        capital = parseInt(document.getElementById("capital").value);
        console.log("Got capital: " + capital + typeof capital);
        machine = parseInt(document.getElementById("machine").value);
        console.log("Got machine value: " + machine);
        discountRate = parseInt(document.getElementById("discountRate").value);
        console.log("Got discount rate: " + discountRate + '%');
        depreciation = parseInt(document.getElementById("depreciation").value);
        console.log("Got depreciation: " + depreciation + '%');

        for (let i = 0; i < nOfPeriods - 1; i++) {

            let sale = parseInt(document.getElementById('sales').children[i].value);
            sales.push(sale);

            let cost = parseInt(document.getElementById('costs').children[i].value);
            costs.push(cost);

        }
        console.log('Looking for sales data, found: ' + sales);
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
        console.log(npv);

        document.getElementById("message").innerHTML = `You sent data! See your NPV: ${npv}`;

    });

}

