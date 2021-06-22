const sendJoinRoomConnectionStatus = (io, socket, roomId, status) => {
    io.to(socket.id).emit('sendJoinRoomStatus', { roomId, status });
}

module.exports = sendJoinRoomConnectionStatus;