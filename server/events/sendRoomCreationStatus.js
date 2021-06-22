const sendRoomCreationStatus = (io, socket) => {
    io.to(socket.id).emit('sendRoomCreationStatus');
}

module.exports = sendRoomCreationStatus;