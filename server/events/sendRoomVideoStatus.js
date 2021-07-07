const sendRoomVideoStatus = (io, socket, roomId, roomData) => {
    io.to(roomId).emit('sendRoomVideoStatus', {
        playing: roomData.videoPlaying,
        progress: roomData.videoDurationSeconds
    });
}

module.exports = sendRoomVideoStatus;