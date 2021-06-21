const sendError = (io, socket, message) => {
    io.to(socket.id).emit('sendError', message);
}

module.exports = sendError;