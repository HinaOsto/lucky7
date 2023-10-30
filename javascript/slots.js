import { setUserBet, checkUserBet, isUserLoggedIn}  from "../globalFuncitons/global.js";

function randomNumberGenerator(){
    return Math.floor(Math.random() * 6 + 1);
}

let slot1 = document.getElementById("num1");
let slot2 = document.getElementById("num2");
let slot3 = document.getElementById("num3");
let bet = document.getElementById("bet");

let spinWheel = document.getElementById("spin");
spinWheel.addEventListener("click", () => {
    bet = document.getElementById("bet").value;
    let currentBet = document.getElementById("bet").value;
    if(isUserLoggedIn()){
        
        if(bet = document.getElementById("bet").value <= 0){
            alert("Please bet more than 0 coins");
        } else if (!checkUserBet(currentBet)) {
            alert("You dont have enough to bet!");
        } else {
            doSlots();
        }
    } else {
        alert("Please log in before playing games");
    }
})

let firstInterval;
let secondInterval;
let thirdInterval;

const delay = 2000; //Milliseconds -> Seconds 20


function start(){
    firstInterval = setInterval(() => {
        slot1.textContent = randomNumberGenerator();
        slot2.textContent = randomNumberGenerator();
        slot3.textContent = randomNumberGenerator();
    }, 500);
    secondInterval = setInterval(() => {
        slot2.textContent = randomNumberGenerator();
        slot3.textContent = randomNumberGenerator();
    }, 500);
    thirdInterval = setInterval(() => {
        slot3.textContent = randomNumberGenerator();
    }, 500);
}

let randomNumbers = [];

function doSlots(){
    for(let i = 0; i < 3; i++){
        randomNumbers[i] = randomNumberGenerator();
    }
    start();
    setTimeout(setHtmlContent, delay);
    setTimeout(setSecondHtml, delay + 2000);
    setTimeout(setThirdHtml, delay + 4000);
    console.log("done");


}

function setHtmlContent(){
    clearInterval(firstInterval);
    slot1.innerHTML=randomNumbers[0];
    console.log(1);
}

function setSecondHtml(){
    clearInterval(secondInterval);
    slot2.innerHTML=randomNumbers[1];
    console.log(2);
}

function setThirdHtml(){
    clearInterval(thirdInterval);
    slot3.innerHTML=randomNumbers[2];
    console.log(3);

    didUserWin();
}



const allEqual = arr => arr.every( v => v === arr[0] )

function playerWin(bet){
    setUserBet(bet, 1);
}

function playerLoss(bet){
    setUserBet(bet, 0);
}

function didUserWin(){
    bet = document.getElementById("bet").value;
    if(allEqual(randomNumbers)){
        console.log("You won! Your Pay out is what you bet x the numbers, For Example, 20 bet with three 6's is 6x Payout!");
        let Payout = bet * 6;
        playerWin(Payout);
    } else {
        console.log("You Lost! Sorry!");
        playerLoss(bet);
    }
}



