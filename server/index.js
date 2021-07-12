const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const initListeners = require('./listeners');

const { users, rooms } = require('./data/data');
const handleLeaveRoom = require('./helpers/handleLeaveRoom');

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
    socket.use((packet, next) => {
        const roomId = packet[1];
        const socketRoom = [...socket.rooms];
        const socketRoomId = socketRoom[1];

        if (!rooms[roomId]) return next();
        if (!socketRoomId) return next();

        if (roomId === socketRoomId) return next();
        
        next(new Error("That's illegal!"));
    });

    initListeners(io, socket);

    users[socket.id] = null;

    socket.on('disconnecting', () => {
        const socketRoom = [...socket.rooms];
        const roomId = socketRoom[1];

        if (roomId && rooms[roomId]) {
            handleLeaveRoom(io, socket, roomId);
        }
    })

    socket.on('disconnect', () => {
        delete users[socket.id];
    })
})
