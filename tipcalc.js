var billSum
var partyNum
var billTotal
var partyShare
var tipPercent
var realTipPercent
var soloBillInputArray = Array.new
var soloBillTaxArray = Array.new
var soloBillTotal
var soloLength
var soloCount
var soloNum
var billDisplay = document.getElementById("billDisplay")
var NewBillSum
var soloBillHolder = document.getElementById("solo-holder")
var soloBillContainer = document.getElementById("solo-bill-container")
var soloBillInput
var soloBillTax
var soloBillDisplay
var soloBillDisplayArray = Array.new
var soloBillPayAmount
var realSoloBillTax
const initialValue = 0

soloBillTotal = 0

document.getElementById('solo-no-true').style.display = "none"

function calcSoloBillTotal() {
    soloBillTotal = 0

    soloBillInputArray.forEach((element) => {
        soloBillTotal = soloBillTotal + Number(element.value)
    })

    console.log("This is solo bill total:")
    console.log(soloBillTotal)
}

function calcPartyNum() {

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

function calcSoloBill() {
    soloBillPayAmount = (soloBillInput * (1 + realSoloBillTax))
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

function checkSoloTipPercent() {
    if (soloBillTax == 1) {
        realSoloBillTax = .01
    } else if (soloBillTax == 0) {
        realSoloBillTax = 0
    } else if (soloBillTax > 1) {
        realSoloBillTax = soloBillTax / 100
    } else {
        realSoloBillTax = soloBillTax }
}

function clearSoloCount(soloCount) {
    let soloHolderChildren = document.getElementById("solo-holder").childElementCount

    if (soloHolderChildren > soloCount) {
        soloTarget = soloHolderChildren - soloCount

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
        
        var clonedDiv = soloBillContainer.cloneNode(true)

        soloBillHolder.appendChild(clonedDiv)
    }   
}

function cloneSoloInput() {
    soloCount = document.getElementById("soloCount").value

    test()

    createSoloCount(soloCount)
    clearSoloCount(soloCount)

    /* This function should
    clear the inputs created in the parent div
    then create new ones
    There should be a limit to the amount of
    boxes it can make
    I'm thinking about allowing users to use the arrows
    on the input box
    */
}

function checkInput(billSum, partyNum, tipPercent) {

    if (partyNum == "" && billSum == "" && tipPercent == "") {
        billDisplay.innerHTML = ("Please enter a party size, bill and tip percentage.")
    } else if (partyNum == "" && billSum == "") {
        billDisplay.innerHTML = ("Please enter a party size and bill.")
    } else if (partyNum == "" && tipPercent == "") {
        billDisplay.innerHTML = ("Please enter a party size and tip percentage.")
    } else if (billSum == "" && tipPercent == "") {
        billDisplay.innerHTML = ("Please enter your bill and tip percentage.")
    } else if (billSum == "") {
        billDisplay.innerHTML = ("Please enter your bill.")
    } else if (partyNum == "") {
        billDisplay.innerHTML = ("Please enter your party size.")
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

function checkSoloInput(soloBillInput, soloBillTax) {
    soloBillDisplayArray = document.querySelectorAll("#solo-bill-display")

    soloBillDisplayArray.forEach((element) => {
        if (soloBillInput == "") {
            element.innerHTML = `Please enter an amount.`
        } else if (soloBillTax == "") {
            element.innerHTML = `You should pay this amount: ${soloBillInput}`
        } else {
            checkSoloTipPercent()
            calcSoloBill()
            element.innerHTML = `You should pay this amount: ${soloBillPayAmount.toFixed(2)}`
        }
    })
}

function soloBillChecker() {
    soloBillInputArray = document.querySelectorAll("#solo-bill")
 
    soloBillInputArray.forEach((element) => {
        if (element != null) {
            soloBillInput = element.value
            console.log("This is your solo bill input:")
            console.log(soloBillInput)
        } else {
            soloBillInput = null;
        }
    })

    calcSoloBillTotal()
}

function soloTaxChecker() {
    soloBillTaxArray = document.querySelectorAll("#solo-bill-tax")

    soloBillTaxArray.forEach((element) => {
        if (element != null) {
            soloBillTax = element.value
            console.log("This is your solo tax input:")
            console.log(soloBillTax)
        } else {
            soloBillTax = null;
        }
    })
}

function gatherInfo() {
    billSum = document.getElementById("billSum").value
    partyNum = document.getElementById("partyNum").value
    tipPercent = document.getElementById("tipPercent").value
    soloNum = document.getElementById("soloCount").value

    soloCount = document.getElementById("soloCount").value

    soloBillChecker()

    soloTaxChecker()
}

function test() {
    gatherInfo()

    calcPartyNum()

    /*cloneSoloInput()

    /*
    This function is triggering a null type error
    for solo bill input
    Fix me later
    Found a fix but adding the test function to the cloneSoloInput function
    creates a similiar error (I didn't have a chance to read the actual discription)
    */

    /*checkSoloInput(soloBillInput, soloBillTax)*/

    calcBillSum(billSum, soloBillTotal)

    checkInput(NewBillSum, partyNum, tipPercent)

    /*
    I need to create a new variable for the total bill sum
    after solo bill has been taken from it
    and apply the party tip amount to it
    */
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