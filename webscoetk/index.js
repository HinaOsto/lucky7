const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8080});

const clients = new Map();
console.log("h");
wss.on('connection', (ws) =>{
    console.log("User connected");
    const color = Math.floor(Math.random() * 360);
    const metadata = {color};
    clients.set(ws, metadata);

    ws.on('message', (msgAsString) =>{
        console.log("message recieved");
        const outbound = JSON.stringify(msgAsString.toString());
        console.log(outbound);
        [...clients.keys()].forEach((client) =>{
            client.send(outbound);
        });
    });
})