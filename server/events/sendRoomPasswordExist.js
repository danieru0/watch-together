const sendRoomPasswordExist = (io, socket, passwordStatus, roomId, canJoin) => {
    io.to(socket.id).emit('sendRoomPasswordExist', { passwordStatus, roomId, canJoin });
}

module.exports = sendRoomPasswordExist;