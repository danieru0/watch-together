const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestRoomChangeVideoDuration', (roomId, videoProgress) => {
        const { sendRoomVideoDuration, sendError } = events;        

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];

            if (selectedRoom.adminControl) {
                if (selectedRoom.currentAdminId !== socket.id) {
                    return sendError(io, socket, 'Only admin can control video!');
                }
            }

            selectedRoom.videoDurationSeconds = videoProgress;

            sendRoomVideoDuration(io, socket, roomId, selectedRoom);
        }
    })
}