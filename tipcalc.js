var billSum
var partyNum
var billTotal
var partyShare
var tipPercent
var realTipPercent
var soloBillInputArray = Array.new
var soloBillTipArray = Array.new
var soloBillTotal
var soloCount
var billDisplay = document.getElementById("billDisplay")
var NewBillSum
var soloBillHolder = document.getElementById("solo-holder")
var soloBillContainer = document.getElementById("solo-bill-container")
var soloBillInput
var soloBillTip
var soloBillDisplay
var soloBillDisplayArray = Array.new
var soloBillPayAmount
var realSoloBillTip
var soloBillContainerArray
var landscapeImgArray = Array.new
var height = window.innerHeight
var width = screen.width
var targetNum

function initialize() {
    soloBillTotal = 0

    document.getElementById('bill-presenter-page-2').style.display = "none"

    setBackground(height, width)
}

function landscapeBackground() {
    /*document.getElementById("bill-presenter-page-1").style.width = "300px"
    document.getElementById("bill-presenter-page-2").style.width = "300px"
    document.getElementById("check-page-1").style.width = "300px"
    document.getElementById("check-page-2").style.width = "300px"*/

    var bg1 = "url('landscape_images/stefan-vladimirov-Q_Moi2xjieU-unsplash.jpg')"
    var bg2 = "url('landscape_images/spencer-davis-vJsj-hgOEG0-unsplash.jpg')"
    var bg3 = "url('landscape_images/klara-kulikova-WcV2YkM3Dls-unsplash.jpg')"
    var bg4 = "url('landscape_images/dan-gold-E6HjQaB7UEA-unsplash.jpg')"

    const backgroundArray = [bg1, bg2, bg3, bg4]

    document.body.style.backgroundImage = backgroundArray[Math.floor(Math.random() * backgroundArray.length)]

    document.body.style.backgroundSize = "Cover"
}

function portraitBackground() {
    var bg1 = "url('portrait_images/bundo-kim-Pb9bUzH1nD8-unsplash.jpg')"
    var bg2 = "url('portrait_images/chris-liverani-oCsaxvGCehM-unsplash.jpg')"
    var bg3 = "url('portrait_images/markus-winkler-1gkvpUCQkmA-unsplash.jpg')"
    var bg4 = "url('portrait_images/stella-de-smit-raE26Th7NwE-unsplash.jpg')"

    const backgroundArray = [bg1, bg2, bg3, bg4]

    var test = backgroundArray[Math.floor(Math.random() * backgroundArray.length)]

    document.body.style.backgroundImage = test

    document.body.style.backgroundSize = "Cover"
}

function setBackground(height, width) {

    if (width > height) {
        landscapeBackground()
    } else {
        portraitBackground()
    }
}

function calcSoloBillTotal() {
    soloBillTotal = 0

    soloBillInputArray.forEach((element) => {
        soloBillTotal = soloBillTotal + Number(element.value)
    })

}

function calcPartyNum() {

    partyNum = partyNum - soloCount
}

function calcBillSum(billSum, soloBillTotal) {
    NewBillSum = billSum - soloBillTotal
}

function calcPartyShare() {
    if (document.getElementById('ptt-flat').checked) {
        billTotal = Number(NewBillSum) + Number(tipPercent)
    } else {
        billTotal = (NewBillSum * (1 + realTipPercent))
    }
    partyShare = billTotal / partyNum
}

function calcSoloBill() {
    soloBillPayAmount = (soloBillInput * (1 + realSoloBillTip))
}

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
    if (soloBillTip == 1) {
        realSoloBillTip = .01
    } else if (soloBillTip == 0) {
        realSoloBillTip = 0
    } else if (soloBillTip > 1) {
        realSoloBillTip = soloBillTip / 100
    } else {
        realSoloBillTip = soloBillTip }
}

function clearSoloCount(soloCount, partyNum) {
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

function createSoloCount(targetNum) {

    for (let index = 0; index < targetNum; index++) {         
        
        var clonedDiv = soloBillContainer.cloneNode(true)

        soloBillHolder.appendChild(clonedDiv)
    }   
}

function cloneSoloInput() {
    soloCount = document.getElementById("soloCount").value
    partyNum = document.getElementById("partyNum").value

    if (soloCount > partyNum) {
        targetNum = partyNum
    } else {
        targetNum = soloCount
    }

    createSoloCount(targetNum)
    clearSoloCount(targetNum)

    mainFunction()
}

function checkInput(billSum, partyNum, tipPercent) {
    partyNumInput = document.getElementById("partyNum").value

    if (soloCount >= partyNumInput) {
        billDisplay.innerHTML = ("You have too many solo payers. Please double check.")
    } else if (partyNum == "" && billSum == "" && tipPercent == "") {
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
        if (partyShare < 0) {
            billDisplay.innerHTML = ("Please check your math")
        } else {
            billDisplay.innerHTML = `Each party member should pay this amount: ${partyShare.toFixed(2)}`
        }
    } else {
        checkTipPercent()
        calcPartyShare()
        if (partyShare < 0) {
            billDisplay.innerHTML = ("Please check your math")
        } else {
            billDisplay.innerHTML = `Each party member should pay this amount: ${partyShare.toFixed(2)}`
        }
    }   
}

function checkSoloInput() {
    soloBillContainerArray = document.querySelectorAll("#solo-bill-container")

    soloBillContainerArray.forEach((element) => {

        soloBillInput = Number(element.querySelector("#solo-bill").value)

        soloBillTip = element.querySelector("#solo-bill-tip").value

        soloBillDisplay = element.querySelector("#solo-bill-display")

        if (soloBillInput == "") {
            soloBillDisplay.innerHTML = `Please enter an amount.`
        } else if (soloBillTip == "") {
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

function soloTipChecker() {
    soloBillTipArray = document.querySelectorAll("#solo-bill-tip")

    soloBillTipArray.forEach((element) => {
        if (element != null) {
            soloBillTip = element.value
        } else {
            soloBillTip = null;
        }
    })
}

function gatherInfo() {
    billSum = document.getElementById("billSum").value
    partyNum = document.getElementById("partyNum").value
    tipPercent = document.getElementById("tipPercent").value

    soloCount = document.getElementById("soloCount").value

    soloBillChecker()

    soloTipChecker()
}

function mainFunction() {
    gatherInfo()

    checkSoloInput()

    calcPartyNum()

    calcBillSum(billSum, soloBillTotal)

    checkInput(NewBillSum, partyNum, tipPercent)
}

function secondaryFunction() {
    gatherInfo()

    cloneSoloInput()
}

function yesnoCheck() {
    if (document.getElementById('solo-no').checked) {
        document.getElementById('bill-presenter-page-2').style.display = "flex";
        mainFunction()
    } else {
        document.getElementById('bill-presenter-page-2').style.display = "none";
        document.getElementById("soloCount").value = 0
    }
}

initialize()

/*
TO DO:

Be sure to thank the photographers
!!!Watch out for when people rotate their phone screens
Thank the photographer with a link fixed at the bottom of the page
Maybe display equation so party verify math
Start/finish readme file
*/