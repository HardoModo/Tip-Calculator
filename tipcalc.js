var billSum
var partyNum
var billTotal
var partyShare
var tipPercent
var realTipPercent
var soloBill = Array.new
var soloBillTotal
var soloLength
var soloCount
var soloNum
var billDisplay = document.getElementById("billDisplay")

document.getElementById('solo-no-true').style.display = "none"

/*
Look up more efficent ways to have the solo bill payer
boxes start as hidden by default 
*/

function fillSoloArray(soloBill) {
    /* This function will fill the soloBill function with the guests that want to pay for their checks seperately */
}

function calcSoloBillTotal(soloBill) {
    /* solo bill is going to be an array filled with the name and bill of people that want to pay for their own stuff.
    solo bill total is going to be the sum of all the solo bills which will be subtracted from the bill the rest of
    the group will pay. Tips have not been added yet.*/
    soloLength = soloBill.length
    soloBillTotal = soloBill /* Fix me */
    return soloBillTotal
}

function calcPartyNum(partyNum, soloNum) {
    partyNum = partyNum - soloNum
    return partyNum
}

function calcBillSum(billSum, soloBillTotal) {
    billSum = billSum - soloBillTotal
    return billSum
}

function calcPartyShare(billSum, partyNum, tipPercent) {
    billTotal = billSum * (1 + tipPercent)
    partyShare = billTotal / partyNum
    return partyShare
}

function calcSoloBillTip(soloBill) {
    /* This function will calculate the amount each solo guest will pay.
    It will update the solo bill array */
    soloBill = soloBill * tipPercent

    /* Ask users if they would like to enter a cash
    value for tip or tip over 100%
    */
    
}

function displayTotal(partyShare, soloBill) {
    /* This function will display the amount everyone has to pay
    Including solo bill payers */
    console.log(`Everyone that is paying for themselves should pay this amount: ${partyShare}`)
    console.log(`Solo payer A should pay this amount: ${soloBill}`)
    console.log(`Solo payer B should pay... `)
    /* There should possibly be a loop here based off the amount of solo bill payers that displays
    the amount each solo bill payer should pay 
    */
}

/* Ask if they are intentionally leaving a tip greater than 100% */

function checkTipPercent(tipPercent) {
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
        /*
        These logs were used to help me track the creation and deletion of
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

    /*document.getElementById("solo-bill-1").addEventListener("input", console.log("Bill received."))*/

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
        calcPartyShare(billSum, partyNum, 0)    
        billDisplay.innerHTML = `Each party member should pay this amount: ${partyShare.toFixed(2)}`
    } else {
        checkTipPercent(tipPercent)
        calcPartyShare(billSum, partyNum, realTipPercent)    
        billDisplay.innerHTML = `Each party member should pay this amount: ${partyShare.toFixed(2)}`
    }
    
}

function test() {
    billSum = document.getElementById("billSum").value
    partyNum = document.getElementById("partyNum").value
    tipPercent = document.getElementById("tipPercent").value

    checkInput(billSum, partyNum, tipPercent)
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
Should I have the program react to input being filled vs the button?
Fix the solo payer check box 
(It should say Yes and show the box when
its checked; hidden by default)
Rename the project to bill spliter
Add a couple of divs to keep track
of who paid who?
*/