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

function clearSoloCount() {
    console.log("Cleared!")
}

function createSoloCount(soloCount) {
    const newInput = document.createElement("div")
    /*newInput.appendChild(newContent)*/

    const currentDiv = document.getElementById("solo-holder");
    document.body.insertBefore(newInput, currentDiv)
}

function addSoloCount() {
    soloCount = document.getElementById("soloCount").value

    clearSoloCount()
    createSoloCount(soloCount)

    /* This function should
    clear the inputs created in the parent div
    then create new ones
    There should be a limit to the amount of
    boxes it can make
    I'm thinking about allowing users to use the arrows
    on the input box
    Should I use a button to confirm?*/
}

function test() {
    billSum = document.getElementById("billSum").value
    partyNum = document.getElementById("partyNum").value
    tipPercent = document.getElementById("tipPercent").value

    checkTipPercent(tipPercent)
    calcPartyShare(billSum, partyNum, realTipPercent)

    billDisplay.innerHTML = `Each party member should pay this amount: ${partyShare.toFixed(2)}`
}

function yesnoCheck() {

    if (document.getElementById('solo-no').checked) {
        document.getElementById('solo-no-true').style.display = "none";
    } else {
        document.getElementById('solo-no-true').style.display = "block";
    }
}

/* Does anyone want to pay for their own food?
Is anyone paying for someone else?
Has everyone paid?
Should I have the program react to input being filled vs the button?
*/