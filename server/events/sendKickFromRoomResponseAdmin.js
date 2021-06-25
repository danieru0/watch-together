const sendKickFromRoomResponseAdmin = (io, socket) => {
    io.to(socket.id).emit('sendKickFromRoomResponseAdmin');
}

module.exports = sendKickFromRoomResponseAdmin;