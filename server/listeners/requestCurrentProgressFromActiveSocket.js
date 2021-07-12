const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestCurrentProgressFromActiveSocket', roomId => {
        const { sendGetCurrentProgressFromSocket } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];
            const currentAdminSocketId = selectedRoom.currentAdminId;
            
            sendGetCurrentProgressFromSocket(io, socket, currentAdminSocketId);
        }
    })
}