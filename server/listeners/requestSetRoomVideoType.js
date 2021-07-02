const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestSetRoomVideoType', (roomId, videoType) => {
        const { sendRoomVideoType, sendError } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];

            if (selectedRoom.currentAdminId === socket.id) {
                selectedRoom.videoType = videoType;

                sendRoomVideoType(io, socket, roomId, selectedRoom);
            } else {
                sendError(io, socket, 'You are not an admin!');
            }
        }
    })
}