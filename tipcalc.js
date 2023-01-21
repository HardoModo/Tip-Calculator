var billSum
var partyNum
var billTotal
var partyShare
var tipPercent
var realTipPercent
var soloBillInputArray = Array.new
var soloBillTaxArray = Array.new
var soloBillTotal
var soloCount
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
var soloBillContainerArray

soloBillTotal = 0

document.getElementById('check-page-2').style.display = "none"

function calcSoloBillTotal() {
    soloBillTotal = 0

    soloBillInputArray.forEach((element) => {
        soloBillTotal = soloBillTotal + Number(element.value)
    })

}

function calcPartyNum() {

    if (partyNum == "" && soloCount == "") {
        console.log("All good here!")
    } else if (soloCount >= partyNum) {
        console.log("You have too many solo payers. Please double check.")
        /* Add some kind of alert here */
    } else {
    partyNum = partyNum - soloCount
    }
}

function calcBillSum(billSum, soloBillTotal) {
    NewBillSum = billSum - soloBillTotal
}

function calcPartyShare() {
    billTotal = (NewBillSum * (1 + realTipPercent))
    partyShare = billTotal / partyNum
}

function calcSoloBill() {
    soloBillPayAmount = (soloBillInput * (1 + realSoloBillTax))
}

/* 
Ask if they are intentionally leaving a tip greater than 100% 
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

    createSoloCount(soloCount)
    clearSoloCount(soloCount)

    mainFunction()

    /*
    This function should
    clear the inputs created in the parent div
    then create new ones
    There should be a limit to the amount of
    boxes it can make
    I'm thinking about allowing users to use the arrows
    on the input box
    */
}

function checkInput(billSum, partyNum, tipPercent) {

    /*if (soloCount >= partyNum) {
        billDisplay.innerHTML = ("You have too many solo payers. Please double check.")
        document.getElementById("soloCount").value = 0
        /*
        This is a step in the right direction
        but I dont want it to delete the created solo bill divs 
        As it is now it keeps setting solo count to 0 automatically
        even after setting party num to a higher number
        
    } else */if (partyNum == "" && billSum == "" && tipPercent == "") {
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

function checkSoloInput() {
    soloBillContainerArray = document.querySelectorAll("#solo-bill-container")

    soloBillContainerArray.forEach((element) => {

        soloBillInput = Number(element.querySelector("#solo-bill").value)

        soloBillTax = element.querySelector("#solo-bill-tax").value

        soloBillDisplay = element.querySelector("#solo-bill-display")

        if (soloBillInput == "") {
            soloBillDisplay.innerHTML = `Please enter an amount.`
        } else if (soloBillTax == "") {
            soloBillDisplay.innerHTML = `You should pay this amount: ${soloBillInput.toFixed(2)}`
        } else {
            checkSoloTipPercent()
            calcSoloBill()
            soloBillDisplay.innerHTML = `You should pay this amount: ${soloBillPayAmount.toFixed(2)}`
        }
    })
}

function soloBillChecker() {
    soloBillInputArray = document.querySelectorAll("#solo-bill")

    soloBillInputArray.forEach((element) => {
        if (element != null) {
            soloBillInput = element.value
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
        } else {
            soloBillTax = null;
        }
    })
}

function gatherInfo() {
    billSum = document.getElementById("billSum").value
    partyNum = document.getElementById("partyNum").value
    tipPercent = document.getElementById("tipPercent").value

    soloCount = document.getElementById("soloCount").value

    soloBillChecker()

    soloTaxChecker()
}

function mainFunction() {
    gatherInfo()

    calcPartyNum()

    checkSoloInput()

    calcBillSum(billSum, soloBillTotal)

    checkInput(NewBillSum, partyNum, tipPercent)
}

function clearSoloInputs() {
    console.log("I don't do anything now but I will in the future!")
    /*
    This function will eventually clear the solo bill and solo tax inputs
    */
}

function yesnoCheck() {
    if (document.getElementById('solo-no').checked) {
        document.getElementById('check-page-2').style.display = "block";
    } else {
        document.getElementById('check-page-2').style.display = "none";
        document.getElementById("soloCount").value = 0
        clearSoloInputs()
        mainFunction()
        /*
        Find a way to see if I can store the old values of the
        solo inputs and clear the input of solo count
        Probably an array
        I might want to transfer the information to other tabs
        This function should also set party num to party num input value
        */
    }
}

/*
Is anyone paying for someone else?
Has everyone paid?
Add a check to see if the number of solo payers is greater than
the total number of people in the party
Add a check to see if total solo bill is greater than the total bill
Add a couple of divs to keep track of who paid who?
Add a check to see if solo bill total is greater than the whole bill
Add a check for negative bill amount
(like when solo bill total is greater than the original bill)
Think of a way to keep the screen from getting too cluttered
Maybe add tabs for solo payers and
final tab to keep tabs of who paid paid/who has paid
I'd like to make the website look like a check presenter from restaurants
Also have the final tab look like a bill from a restaurant
Use the font they use for their checks
Create 3 divs with borders as a prototype for the check page design
Rename tax to tip
*/