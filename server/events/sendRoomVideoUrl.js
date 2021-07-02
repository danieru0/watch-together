const sendRoomVideoUrl = (io, socket, roomId, roomData) => {
    io.to(roomId).emit('sendRoomVideoUrl', roomData.videoLink, roomData.videoId);
}

module.exports = sendRoomVideoUrl;