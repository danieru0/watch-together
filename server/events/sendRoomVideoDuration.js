const sendRoomVideoDuration = (io, socket, roomId, roomData) => {
    io.to(roomId).emit('sendRoomVideoDuration', roomData.videoDurationSeconds);
}

module.exports = sendRoomVideoDuration;