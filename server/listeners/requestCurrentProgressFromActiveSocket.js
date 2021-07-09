const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestCurrentProgressFromActiveSocket', roomId => {
        const { sendGetCurrentProgressFromSocket } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];
            const firstSocketInRoomId = Object.keys(selectedRoom.activeUsers[0])[0];
            
            sendGetCurrentProgressFromSocket(io, socket, firstSocketInRoomId);
        }
    })
}