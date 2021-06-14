const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const app = express();
app.use(cors);

const staticReactFiles = express.static(path.join(__dirname, '../client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

const server = express()
    .use(staticReactFiles)
    .use((req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')))
    .listen(process.env.PORT || 8080, () => {
        console.log('Server started!');
    })

const io = socket(server);

io.on('connection', () => {
    console.log('made socket connection');
})

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);