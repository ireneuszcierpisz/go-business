document.addEventListener("DOMContentLoaded", function () {

    showMessage();
    showSalesCostsFields();

    collectData();

});

function showMessage() {
    document.getElementById("submit-button").addEventListener("click", function () {
        console.log("submiting button clicked!");
        document.getElementById("message").innerHTML = "You sent data! See your NPV:";
    });
}

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
    document.getElementById("submit-button").addEventListener("click", function () {
        let nOfPeriods = parseInt(document.getElementById("nOfPeriods").value);
        console.log("Got number of periods: " + nOfPeriods);
        let capital = parseInt(document.getElementById("capital").value);
        console.log("Got capital: " + capital);
        let machine = parseInt(document.getElementById("machine").value);
        console.log("Got machine value: " + machine);
        let discountRate = parseInt(document.getElementById("discountRate").value);
        console.log("Got discount rate: " + discountRate + '%');
        let depreciation = parseInt(document.getElementById("depreciation").value);
        console.log("Got depreciation: " + depreciation + '%');

        let sales = [];
        let costs = [];
        for (let i = 0; i < nOfPeriods - 1; i++) {

            let sale = parseInt(document.getElementById('sales').children[i].value);
            sales.push(sale);

            let cost = parseInt(document.getElementById('costs').children[i].value);
            costs.push(cost);

        }
        console.log('Looking for sales data, found: ' + sales);
        console.log('Looking for costs data, found: ' + costs);
    });
}

function calculateNPV() {

}


let x = document.getElementById('sales-costs').children;
console.log('Looking for sales-costs data, found: ' + x);

let capital = parseInt(document.getElementById("capital").value);
console.log("Got capital: " + capital);