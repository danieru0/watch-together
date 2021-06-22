const sendRoomCreationStatus = (io, socket, id) => {
    io.to(socket.id).emit('sendRoomCreationStatus', id);
}

module.exports = sendRoomCreationStatus;