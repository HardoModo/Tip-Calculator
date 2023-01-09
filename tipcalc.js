var billSum
var partyNum
var billTotal
var partyShare
var tipPercent
var realTipPercent
var soloBillArray = Array.new
var soloBillTotal
var soloLength
var soloCount
var soloNum
var billDisplay = document.getElementById("billDisplay")
var NewBillSum

document.getElementById('solo-no-true').style.display = "none"

function calcSoloBillTotal() {
    /* solo bill is going to be an array filled with the name and bill of people that want to pay for their own stuff.
    solo bill total is going to be the sum of all the solo bills which will be subtracted from the bill the rest of
    the group will pay. Tips have not been added yet.*/

    /* When this function is triggered it should add the input of each solo bill input.
    This function currently triggers too early. It should wait until this is an input in either
    partyNum or soloNum*/

    soloLength = soloBill.length
    soloBillTotal = soloBill /* Fix me */
}

function calcPartyNum() {
    /* This function should trigger when partyNum or soloNum changes.
    It currently only triggers when partyNum changes*/

    if (soloNum >= partyNum) {
        console.log("You have too many solo payers. Please double check.")
    } else {
    partyNum = partyNum - soloNum
    }
}

function calcBillSum(billSum, soloBillTotal) {
    NewBillSum = billSum - soloBillTotal
}

function calcPartyShare() {
    billTotal = (billSum * (1 + realTipPercent)) - soloBillTotal
    partyShare = billTotal / partyNum
}

/* Ask if they are intentionally leaving a tip greater than 100% 
Change function so I can change and return input variable
*/

function checkTipPercent() {
    if (tipPercent == 1) {
        realTipPercent = .01
    } else if (tipPercent == 0) {
        realTipPercent = 0
    } else if (tipPercent > 1) {
        realTipPercent = tipPercent / 100
    } else {
        realTipPercent = tipPercent }
}

function clearSoloCount(soloCount) {
    let soloHolderChildren = document.getElementById("solo-holder").childElementCount

    if (soloHolderChildren > soloCount) {
        soloTarget = soloHolderChildren - soloCount

        /* These logs were used to help me track the creation and deletion of
        solo bill payer inputs

        console.log(`There are ${soloHolderChildren} children`)
        console.log(`There are ${soloCount} solo buyers`)
        console.log(`${soloTarget} input should be removed`)*/

        for (let index = 0; index < soloTarget; index++) {
            soloBillContainer = document.getElementById("solo-bill-container")
            soloBillContainer.remove()
        }
    } else if (soloCount > soloHolderChildren) {
        soloTarget = soloCount - soloHolderChildren

        console.log(`${soloTarget} input should be added`)

        createSoloCount(soloTarget)
    }
}

function createSoloCount(soloCount) {

    for (let index = 0; index < soloCount; index++) {         
        const soloBillContainer = document.createElement("div")
        soloBillContainer.setAttribute("id", "solo-bill-container")

        const soloBillInput = document.createElement("input")
        soloBillInput.setAttribute("id", "solo-bill")

        const soloUntaxBill = document.createTextNode("Enter untaxed bill here:");

        const soloBillTax = document.createElement("input")
        soloBillTax.setAttribute("id", "solo-bill-tax")

        const soloBillDisplay = document.createElement("div")
        soloBillDisplay.setAttribute("id", "solo-bill-display")

        const soloTax = document.createTextNode("Enter tax here:");

        const soloHolder = document.getElementById("solo-holder");

        soloHolder.appendChild(soloBillContainer)

        soloBillContainer.appendChild(soloUntaxBill)
        soloBillContainer.appendChild(soloBillInput)
        soloBillContainer.appendChild(soloTax)
        soloBillContainer.appendChild(soloBillTax)
        soloBillContainer.appendChild(soloBillDisplay)
    }
}

function addSoloCount() {

    soloCount = document.getElementById("soloCount").value

    createSoloCount(soloCount)
    clearSoloCount(soloCount)

    /* Look up adding DOM events to dynamic elements for the solo bill calculator */

    /* document.getElementById("solo-bill-1").addEventListener("input", console.log("Bill received."))*/

    /* This function should
    clear the inputs created in the parent div
    then create new ones
    There should be a limit to the amount of
    boxes it can make
    I'm thinking about allowing users to use the arrows
    on the input box
    Should I use a button to confirm?*/
}

function checkInput(billSum, partyNum, tipPercent) {

    if (partyNum == "" && billSum == "" && tipPercent == "") {
        billDisplay.innerHTML = ("Please enter a party size, bill and tip percentage")
    } else if (partyNum == "" && billSum == "") {
        billDisplay.innerHTML = ("Please enter a party size and bill")
    } else if (partyNum == "" && tipPercent == "") {
        billDisplay.innerHTML = ("Please enter a party size and tip percentage")
    } else if (billSum == "" && tipPercent == "") {
        billDisplay.innerHTML = ("Please enter your bill and tip percentage")
    } else if (billSum == "") {
        billDisplay.innerHTML = ("Please enter your bill")
    } else if (partyNum == "") {
        billDisplay.innerHTML = ("Please enter your party size")
    } else if (tipPercent == "") {
        realTipPercent = 0
        calcPartyShare()    
        billDisplay.innerHTML = `Each party member should pay this amount: ${partyShare.toFixed(2)}`
    } else {
        checkTipPercent()
        calcPartyShare()    
        billDisplay.innerHTML = `Each party member should pay this amount: ${partyShare.toFixed(2)}`
    }
    
}

function test() {
    billSum = document.getElementById("billSum").value
    partyNum = document.getElementById("partyNum").value
    tipPercent = document.getElementById("tipPercent").value
    soloNum = document.getElementById("soloCount").value

    soloBillTotal = 0

    calcPartyNum()
    calcBillSum(billSum, soloBillTotal)
    checkInput(NewBillSum, partyNum, tipPercent)
}

function test2() {
    const soloBillInput = document.getElementById("solo-bill")
    /* const soloBillInputValue = soloBillInput.value*/
    var soloBillTax = document.getElementById("solo-bill-tax")
    var soloBillDisplay = document.getElementById("solo-bill-display")
    const soloBillPayAmount = soloBillInput.value * soloBillTax.value

    /* checkTipPercent(soloBillTax)*/
    /* The input boxes created by my solo input function accepts inputs
    that aren't numbers. I need to either find a way to add input type to those boxes or add
    a check that'll account for values that aren't numbers 
    */

    if (soloBillTax.value == "" || soloBillTax.value == ".") {
        soloBillDisplay.innerHTML = `You should pay this amount: ${soloBillInput.value}`
    } else {
        soloBillDisplay.innerHTML = `You should pay this amount: ${soloBillPayAmount}`
    }
}

function yesnoCheck() {

    if (document.getElementById('solo-no').checked) {
        document.getElementById('solo-no-true').style.display = "block";
    } else {
        document.getElementById('solo-no-true').style.display = "none";
    }
}

/* Does anyone want to pay for their own food?
Is anyone paying for someone else?
Has everyone paid?
Add a check to see if the number of solo payers is greater than
the total number of people in the party
Add a check to see if total solo bill is greater than the total bill
Should I have the program react to input being filled vs the button?
Add a couple of divs to keep track of who paid who?
*/