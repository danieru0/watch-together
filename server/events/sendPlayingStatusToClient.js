const sendPlayingStatusToClient = (io, socket, roomData) => {
    if (roomData.videoPlaying) {
        io.to(socket.id).emit('sendPlayingStatusToClient', roomData.videoPlaying);
    }
}

module.exports = sendPlayingStatusToClient;