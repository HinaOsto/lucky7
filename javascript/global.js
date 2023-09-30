
// Set Bet, Remove if lost bet, etc
function updateBalance(ammount, wL){
    let currentInfo = localStorage.getItem("currentUserInfo");
    let parsedInfo = JSON.parse(currentInfo);
    let username = parsedInfo[0];

    let updatedInfo = [username, ammount];

    let pushInfo = JSON.stringify(updatedInfo);
    localStorage.setItem("currentUserInfo", pushInfo);

    updateLocalStorage(username, ammount, wL);
}

function updateLocalStorage(username, currentBal, wL){
    let storedArrayParse = JSON.parse(localStorage.getItem("storedUsernames"));
    let currentBalanceParse = JSON.parse(localStorage.getItem("currentUserInfo"));

    let value = currentBalanceParse[1];
    let sum = 0;
    let index;
    for(let i = 0; i < storedArrayParse.length; i++){
        if(username === storedArrayParse[i]){
            index = i;
        }
    }

    if(wL === 1){
        sum = value + currentBal;
        let push = [username, sum];
        let stringed = JSON.stringify(push);
        localStorage.setItem("currentUserInfo", stringed);
    } else {
        sum = value - currentBal;
        let push = [username, sum];
        let stringed = JSON.stringify(push);
        localStorage.setItem("currentBalances", stringed);
    }
}

let setUserBet = function setBet(ammount, wL){
    let currentBal = localStorage.getItem("currentUserInfo");
    let parsedInfo = JSON.parse(currentBal);

    let balance = parsedInfo[1];
    let sum = 0;

    if(wL === 1){
        sum = balance + ammount;
        updateBalance(sum, wL)
    } else if (wL === 3){ 
        let bang = balance + ammount;
        updateBalance(bang, wL);
    } else {
        sum = balance - ammount;
        updateBalance(sum, wL)
    }

    console.log("Sum = " + sum);
}

let checkUserBet = function checkBet(ammount){
    let currentBal = localStorage.getItem("currentUserInfo");
    let parsedInfo = JSON.parse(currentBal);

    let balance = parsedInfo[1];
    if(ammount <= balance){
        return 1;
    } else {
        return 0;
    }
}

let isUserLoggedIn = function checkUserLogin(){
    if("currentUserInfo" in localStorage){
        return true;
    }
    return false;
}

export {setUserBet, checkUserBet, isUserLoggedIn};

