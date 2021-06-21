const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const initListeners = require('./listeners');

const data = require('./data/data');

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

io.on('connection', socket => {
    initListeners(io, socket);
    console.log('connected');

    data[socket.id] = null;

    socket.on('disconnect', () => {
        delete data[socket.id];
    })
})
