const events = require('../events');
const { users, rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestSendMessage', (roomId, message) => {
        const { sendMessage } = events;

        if (rooms[roomId]) {
            const userLogin = users[socket.id];

            sendMessage(io, socket, roomId, userLogin, message);
        }
    })
}