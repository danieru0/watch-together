const sendRoomVideoType = (io, socket, roomId, roomData) => {
    io.to(roomId).emit('sendRoomVideoType', roomData.videoType);
}

module.exports = sendRoomVideoType;