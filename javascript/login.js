import {isUserLoggedIn} from "./global.js";
let loginForm = document.getElementById("login");
let loginButton = document.getElementById("loginButton");
let registerButton = document.getElementById("registerButton");

function makeSureLocalStorageExsists(){
    let storedArrayParse = JSON.parse(localStorage.getItem("storedUsernames"));
    let storedPasswordParse = JSON.parse(localStorage.getItem("storedPasswords"));
    let currentBalanceParse = JSON.parse(localStorage.getItem("currentBalances"));
    /* Make sure that the local storage is initilized! */
    if(storedArrayParse){

    } else {
        let emptyArray = ["admin"];
        let balanceArray = [0];
        let stringifyArray = JSON.stringify(emptyArray);
        let stringifyBalance = JSON.stringify(balanceArray);

        localStorage.setItem("storedUsernames", stringifyArray);
        localStorage.setItem("storedPasswords", stringifyArray);
        localStorage.setItem("currentBalances", stringifyBalance);

        storedArrayParse = JSON.parse(localStorage.getItem("storedUsernames"));
        storedPasswordParse = JSON.parse(localStorage.getItem("storedPasswords"));
        currentBalanceParse = JSON.parse(localStorage.getItem("currentBalances"));
    }
}

window.onload = (event) =>{
    makeSureLocalStorageExsists();
    if(isUserLoggedIn()){
        let loginForm = document.getElementById("login");
        let currentBalanceParse = JSON.parse(localStorage.getItem("currentBalances"));
        loginForm.style.fontSize = '50';
        loginForm.style.color = 'white';
        loginForm.style.right = '100px';
        loginForm.innerHTML = "Welcome: " + currentBalanceParse[0];
    }
}

loginButton.addEventListener("click", (event)=>{
    console.log("r");
    event.preventDefault();
    makeSureLocalStorageExsists();
    let username = loginForm.Username.value;
    let password = loginForm.Password.value;
    let index1;
    let index2 = Math.floor(Math.random() * 100000 + 1);    

    let storedArrayParse = JSON.parse(localStorage.getItem("storedUsernames"));
    let storedPasswordParse = JSON.parse(localStorage.getItem("storedPasswords"));
    let currentBalanceParse = JSON.parse(localStorage.getItem("currentBalances"));

    for(let i = 0; i < storedArrayParse.length; i++){
        if(username === storedArrayParse[i]){
            index1 = i;
        }
    }

    for(let i = 0; i < storedPasswordParse.length; i++){
        if(password === storedPasswordParse[i]){
            index2 = i;
            if(index1 !== index2){
                continue;
            } else {
                break;
            }
        }
    }

    let currentLoggedInUser = [];

    if(index1 === index2){
        alert("Logged in, Welcome " + username);
        currentLoggedInUser.push(username);
        currentLoggedInUser.push(currentBalanceParse[index1]);

        let curUser = JSON.stringify(currentLoggedInUser);
        localStorage.setItem("currentUserInfo", curUser);

        window.location.href =  'index.html'
    } else {
        console.log("error");
    }
    
    index1 = 0, index2 = 0;
})

/* This is fine */
registerButton.addEventListener("click", (event)=>{
    console.log("r");
    event.preventDefault();
    makeSureLocalStorageExsists();
    let username = loginForm.Username.value;
    let password = loginForm.Password.value;

    const newUserBalance = 1000;
    /* Make sure that the local storage is initilized! */
    

    let storedArrayParse = JSON.parse(localStorage.getItem("storedUsernames"));
    let storedPasswordParse = JSON.parse(localStorage.getItem("storedPasswords"));
    let currentBalanceParse = JSON.parse(localStorage.getItem("currentBalances"));

    console.log(storedArrayParse);
    for(let i = 0; i < storedArrayParse.length; i++){
        if(username === storedArrayParse[i]){
            alert("Username Already Taken");
            return;
        }
    }

    storedArrayParse.push(username);
    storedPasswordParse.push(password);
    currentBalanceParse.push(newUserBalance);

    let usernameStore = JSON.stringify(storedArrayParse);
    let passwordStore = JSON.stringify(storedPasswordParse);
    let balanceStore = JSON.stringify(currentBalanceParse);

    localStorage.clear();

    localStorage.setItem("storedUsernames", usernameStore);
    localStorage.setItem("storedPasswords", passwordStore);
    localStorage.setItem("currentBalances", balanceStore);
})



