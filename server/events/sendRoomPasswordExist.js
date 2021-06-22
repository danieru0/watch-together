const sendRoomPasswordExist = (io, socket, passwordStatus, roomId) => {
    io.to(socket.id).emit('sendRoomPasswordExist', { passwordStatus, roomId });
}

module.exports = sendRoomPasswordExist;