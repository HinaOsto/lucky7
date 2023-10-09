import { setUserBet, checkUserBet, isUserLoggedIn}  from "./global.js";

let startingCrash = 1.0;
let crashThing = document.getElementById("currentMultiplier");
let submitBet = document.getElementById("submitBet");
let cashOut = document.getElementById("takeProfits");
let lastCrashesHtml = document.getElementById("lastCrashes");
let currentBet;
let lastCrashes = [];
submitBet.addEventListener("click", () =>{
    if(isUserLoggedIn()){
        if(currentBet = document.getElementById("betAmount").value <= 0){
            alert("Please bet more than 0 coins");
        } else {
            if(checkUserBet(currentBet = document.getElementById("betAmount").value)){ 
            submitBet.style.display = 'none';
            doCrash();
            } else {
                alert("You are betting more than you have in your balance!");
            }
        }
    } else {
        alert("Please log in before playing games");
    }
})


cashOut.addEventListener("click", ()=>{
    let crashValue = crashThing.textContent;
    console.log(crashValue);
    currentBet = document.getElementById("betAmount").value;
    clearInterval(firstInterval);
    let bet = crashValue * currentBet;
    console.log(bet + "<- bet");
    playerWin(bet);
    submitBet.style.display = '';

})

function generateCrashNumber(){
    let min = 1.0;
    let max = 2.15;
    let crashNumber = Math.random() * (max - min) + min;
    lastCrashes.push(crashNumber.toFixed(2));
    return crashNumber;
}

function playerWin(bet){

    alert("You Won!");
    console.log("bet2 " + Math.ceil(bet));
    submitBet.style.display = '';
    setUserBet(Math.ceil(bet), 3);
    lastCrashesHtml.innerHTML = lastCrashes;
}

function playerLoss(bet){
    submitBet.style.display = '';
    alert("Crash! You lose!");
    setUserBet(bet, 0);
    lastCrashesHtml.innerHTML = lastCrashes;
}

let firstInterval;

function doCrash(){

    crashThing.innerHTML = startingCrash;
    let crashNumber = generateCrashNumber();
    let innerNumber = startingCrash;
    let cNum;
    let iNum;
    firstInterval = setInterval(() => {
        innerNumber += 0.01;
        crashThing.textContent = innerNumber.toFixed(2); 
        cNum = crashNumber.toFixed(2);
        iNum = innerNumber.toFixed(2);
        if(Math.abs(iNum - cNum) < 1e-9){
            console.log("h");
            clearInterval(firstInterval);
            currentBet = document.getElementById("betAmount").value;
            playerLoss(currentBet);
        }
    }, 40);

    console.log(crashNumber.toFixed(2)); 
}
