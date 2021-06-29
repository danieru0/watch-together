const events = require('../events');
const { users, rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestSendMessage', (roomId, message) => {
        const { sendMessage } = events;

        const socketRoom = [...socket.rooms];
        const socketRoomId = socketRoom[1];

        if (rooms[roomId] && roomId === socketRoomId) {
            const userLogin = users[socket.id];

            sendMessage(io, socket, roomId, userLogin, message);
        }
    })
}