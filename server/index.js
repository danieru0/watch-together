const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const initListeners = require('./listeners');

const { users, rooms } = require('./data/data');
const events = require('./events');

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

    users[socket.id] = null;

    socket.on('disconnecting', () => {
        const { sendRoomsListUpdate } = events;

        const socketRoom = [...socket.rooms];
        const roomId = socketRoom[1];

        if (roomId && rooms[roomId]) {
            const selectedRoom = rooms[roomId];
            selectedRoom.activeUsers.forEach((user, index) => {
                user[socket.id] && selectedRoom.activeUsers.splice(index, 1);
            })

            if (selectedRoom.activeUsers.length === 0) {
                delete rooms[roomId];
            }

            sendRoomsListUpdate(io, socket);
        }
    })

    socket.on('disconnect', () => {
        delete users[socket.id];
    })
})
