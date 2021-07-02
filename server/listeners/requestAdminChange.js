const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestAdminChange', (roomId, userId) => {
        const { sendRoomCurrentAdminId } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];

            if (selectedRoom.currentAdminId === socket.id) {
                selectedRoom.currentAdminId = userId;

                sendRoomCurrentAdminId(io, socket, roomId, selectedRoom);
            }
        }
    })
}