const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8080});

const clients = new Map();
console.log("h");
wss.on('connection', (ws) =>{
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const metadata = {id,color};
    clients.set(ws, metadata);
    console.log("User connected", metadata);

    ws.on('message', (msgAsString) =>{
        console.log("message recieved");
        const outbound = JSON.stringify(msgAsString.toString());
        console.log(outbound);
        [...clients.keys()].forEach((client) =>{
            client.send(outbound);
        });
    });

    ws.on('close', ()=>{
        clients.delete(ws);
        console.log("user disconnected");
    })

})

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }