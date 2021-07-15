const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestRoomPasswordExist', roomId => {
        const { sendRoomPasswordExist } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];
            const ifPasswordExists = selectedRoom.password !== '';

            sendRoomPasswordExist(io, socket, ifPasswordExists, roomId, selectedRoom.activeUsers.length < selectedRoom.usersNumberMax);
        }
    })
}