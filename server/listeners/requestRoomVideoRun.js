const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestRoomVideoRun', (roomId, videoStatus, videoProgress) => {
        const { sendRoomVideoStatus, sendError } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];

            if (selectedRoom.adminControl) {
                if (selectedRoom.currentAdminId !== socket.id) {
                    return sendError(io, socket, 'Only admin can control video!');
                }
            }

            selectedRoom.videoPlaying = videoStatus;
            selectedRoom.videoDurationSeconds = videoProgress;

            sendRoomVideoStatus(io, socket, roomId, selectedRoom);
        }
    })
}