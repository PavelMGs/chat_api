const ws = require('ws');

const PORT = process.env.PORT || 8000;

const wss = new ws.Server({
    port: PORT,
}, () => console.log(`Server is running at the PORT: ${PORT}`)
)

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = JSON.parse(message);
        switch(message.event) {
            case 'message': {
                broadcastMessage(message);
                break;
            }
            case 'connection': {
                broadcastMessage(message); 
            }
        }
    })
})

const broadcastMessage = (message) => {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

const message = {
    event: 'message/connection',
    id: 123,
    date: '21.07.2021',
    username: 'PavelMG',
    message: 'Hi',
}
