const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestInitRoomData', roomId => {
        const { sendRoomUsers, sendRoomCurrentAdminId } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];

            sendRoomUsers(io, socket, selectedRoom, roomId);
            sendRoomCurrentAdminId(io, socket, selectedRoom, roomId);
        }
    })
}