import { setUserBet, checkUserBet, isUserLoggedIn}  from "./global.js";

let currentBet = document.getElementById("bet")// Put html thing here
let uInfo = document.getElementById("userInfo");
let dinfo = document.getElementById("dealerInfo");
let current = document.getElementById("balance");

let getCards = document.getElementById("getCards");
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

let hitCards = document.getElementById("hit");
hitCards.addEventListener("click", () =>{
    hitPlayerCards();
})

let playerStandButton = document.getElementById("stand");
playerStandButton.addEventListener("click", () =>{
    playerStand();
})

function generateRandomNumbers(){
    return Math.floor(Math.random() * 10 + 1)
}

function playerWin(bet){
    bet *= 1.5;
    getCards.style.display = 'block';
    alert("You Won!");
    setUserBet(bet, 1);
}

function playerLoss(bet){
    getCards.style.display = 'block';
    alert("You lost!");
    setUserBet(bet, 0);
}

function playerDraw(bet){
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
        playerStandButton.style.display = 'visible';
        uInfo.innerHTML = sum;
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
        uInfo.innerHTML = "Bust";
        playerStandButton.style.display = 'none';
        hitCards.style.direction = 'none';
        playerLoss(currentBet);
    } else {
        uInfo.innerHTML = sum;
    }
}

function playerStand(){
    let dealerSum = dealerLogic();
    let playerSum = 0;
    for(let i = 0; i < userCards; i++){
        playerSum += userCards[i];
    }

    if(playerSum > dealerSum){
        playerWin(currentBet);
    } else if (playerSum === dealerSum) {
        playerDraw(currentBet);
    } else {
        playerLoss(currentBet);
    }
    hitCards.style.direction = 'none';
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
        sum = 21;
        dinfo.innerHTML = sum;
        return sum;
    } else {
        dinfo.innerHTML = sum;
        return sum;
    }

}