const sendGetCurrentProgressFromSocket = (io, socket, activeSocketId) => {
    io.to(activeSocketId).emit('sendGetCurrentProgressFromSocket', socket.id);
}

module.exports = sendGetCurrentProgressFromSocket;