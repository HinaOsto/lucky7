import { setUserBet, checkUserBet, isUserLoggedIn }  from "./global.js";

let startingCrash = 1.0;
let crashThing = document.getElementById("currentMultiplier");
let submitBet = document.getElementById("submitBet");
let cashOut = document.getElementById("takeProfits");
let currentBet;

submitBet.addEventListener("click", () =>{
    if(isUserLoggedIn()){
        if(currentBet = document.getElementById("betAmount").value <= 0){
            alert("Please bet more than 0 coins");
        } else {
            if(checkUserBet(currentBet = document.getElementById("betAmount").value)){  
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
    cashOut.style.display = 'none';
})

function generateCrashNumber(){
    let min = 1.0;
    let max = 2.15;
    let crashNumber = Math.random() * (max - min) + min;
    return crashNumber;
}

function playerWin(bet){
    submitBet.style.display = 'block';
    alert("You Won!");
    console.log("bet2 " + Math.ceil(bet));

    setUserBet(Math.ceil(bet), 3);
}

function playerLoss(bet){
    submitBet.style.display = 'block';
    alert("Crash! You lose!");
    setUserBet(bet, 0);
}

let firstInterval;

function doCrash(){
    submitBet.style.display = 'none';
    cashOut.style.display = 'block';
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
