import { setUserBet, checkUserBet, isUserLoggedIn}  from "./global.js";

let currentBet = document.getElementById("bet");// Put html thing here
let uInfo = document.getElementById("player");
let dinfo = document.getElementById("computer");
let current = document.getElementById("cash");

let getCards = document.getElementById("placeBet");
getCards.addEventListener("click", () =>{
    if(isUserLoggedIn()){
        if(currentBet = document.getElementById("bet").value <= 0){
            alert("Please bet more than 0 coins");
        } else {
            getPlayerCards();
            getCards.style.display = 'none';
            
        }
    } else {
        alert("Please log in before playing games");
    }
})

let hitCards = document.getElementById("playHit");
hitCards.addEventListener("click", () =>{
    hitPlayerCards();
})

let playerStandButton = document.getElementById("playStay");
playerStandButton.addEventListener("click", () =>{
    playerStand();
})

function generateRandomNumbers(){
    return Math.floor(Math.random() * 10 + 1)
}

function playerWin(bet){
    hitCards.style.visibility = 'hidden';
    playerStandButton.style.visibility = 'hidden';
    bet *= 1.5;
    getCards.style.display = 'block';
    alert("You Won!");
    setUserBet(bet, 1);
}

function playerLoss(bet){
    hitCards.style.visibility = 'hidden';
    playerStandButton.style.visibility = 'hidden';
    getCards.style.display = 'block';
    alert("You lost!");
    setUserBet(bet, 0);
}

function playerDraw(bet){
    hitCards.style.visibility = 'hidden';
    playerStandButton.style.visibility = 'hidden';
    getCards.style.display = 'block';
    alert("draw!");
    setUserBet(bet, 1);

}

//User Shit
let userCards = [];
function getPlayerCards(){
    let currentBalanceParse = JSON.parse(localStorage.getItem("currentUserInfo"));
    current.innerHTML = currentBalanceParse[1] + " <- Current Balance";
    currentBet = document.getElementById("bet").value;
    if(checkUserBet(currentBet)){
        userCards = [];
        let sum = 0;
        for(let i = 0; i < 2; i++){
            userCards[i] = generateRandomNumbers();
            sum += userCards[i]
        }
    
        while(sum === 21){
            userCards = [];
            for(let i = 0; i < userCards.length; i++){
                userCards[i] = generateRandomNumbers();
                sum += userCards[i];
            }
        }
        hitCards.style.visibility = 'visible';
        playerStandButton.style.visibility = 'visible';
        uInfo.innerHTML = "You: " + sum;
        getDealerCards();
    } else {
        alert("Invalid Bet Ammount! You Are Betting More Than You Have! Your Current Balance Is:" + currentBalanceParse[1] + " You are trying to bet " + currentBet);
    }
}

function hitPlayerCards(){
    let sum = 0;
    userCards.push(generateRandomNumbers());
    for(let i = 0; i < userCards.length; i++){
        sum += userCards[i];
    }
    if(sum > 21){
        uInfo.innerHTML = "You: " + sum + "Bust";
        hitCards.style.visibility = 'hidden';
        playerStandButton.style.visibility = 'hidden';
        playerLoss(currentBet);
    } else {
        uInfo.innerHTML = "You: " + sum;
    }
}

function playerStand(){
    let dealerSum = dealerLogic();
    let playerSum = 0;
    for(let i = 0; i < userCards.length; i++){
        playerSum += userCards[i];    
    }

    console.log(playerSum);
    console.log(dealerSum + "d");

    if(playerSum > 19){
        playerWin(currentBet);
    } else if (playerSum === dealerSum) {
        playerDraw(currentBet);
    } else {
        playerLoss(currentBet);
    }
    hitCards.style.visibility = 'hidden';
}

//Dealer Shit
let dealerCards = [];
function getDealerCards(){
    let sum = 0;
    for(let i = 0; i < 2; i++){
        dealerCards[i] = generateRandomNumbers();
        sum += dealerCards[i];
    }

    while(sum === 21){
        dealerCards = [];
        for(let i = 0; i < dealerCards.length; i++){
            dealerCards[i] = generateRandomNumbers();
            sum += dealerCards[i];
        }
    }
    dinfo.innerHTML = sum;
}

//This is extremly rigged
function dealerLogic(){
    let sum = 0;
    for(let i = 0; i < dealerCards.length; i++){
        sum += dealerCards[i];
    }

    if(sum < 17){
        sum = 19;
        dinfo.innerHTML = sum;
        return sum;
    } else {
        dinfo.innerHTML = sum;
        return sum;
    }

}