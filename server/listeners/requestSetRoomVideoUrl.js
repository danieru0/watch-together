const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestSetRoomVideoUrl', (roomId, videoUrl, videoId) => {
        const { sendRoomVideoUrl, sendError } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];

            if (selectedRoom.currentAdminId === socket.id) {
                selectedRoom.videoLink = videoUrl;
                selectedRoom.videoId = videoId;

                sendRoomVideoUrl(io, socket, roomId, selectedRoom);
            } else {
                sendError(io, socket, 'You are not an admin!');
            }
        }
    })
}