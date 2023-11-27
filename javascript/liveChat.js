
(async function(){
    const ws = await connectToServer();
    let messageBody = document.getElementById("websocketText");
    let submitMessage = document.getElementById("sendWebsocket");
    let getMessage = document.getElementById("chat2");

    let currentBalanceParse = JSON.parse(localStorage.getItem("currentUserInfo"));
    submitMessage.addEventListener("click", ()=>{
        ws.send(messageBody.value + " ouiadw321");

        let div = document.createElement("div");
        div.id = "newChat";
        //currentBalanceParse[0] + ": "+  
        div.innerHTML = messageBody.value;

        getMessage.appendChild(div);
    })

    ws.onmessage = (webSocketMessage) =>{
        let string = webSocketMessage.data;
        let thisString = JSON.stringify(string);
        if(!thisString.includes(" ouiadw321")){
            const removePart = " bigfuckingballsinmymouth";
            let newString = thisString.replace(' bigfuckingballsinmymouth', '');
            let newNewString = newString.replace(/['"]+/g, '');
            let showString = newNewString.replace("\\\\", "");

            let div = document.createElement("div");
            div.id = "newChat";
            div.innerHTML = "Support Says: " + showString.toString();

            console.log("message recieved");
            getMessage.appendChild(div);
        }
    };

    async function connectToServer() {
        const ws = new WebSocket('wss://elegant-kindly-soy.glitch.me');
    
        ws.onclose = function(event){console.log(event);}
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                if(ws.readyState === 1) {
                    clearInterval(timer)
                    resolve(ws);
                }
            }, 10);
        });
    }
})();
