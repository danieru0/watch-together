const sendLoginStatus = (io, socket, data) => {
    io.to(socket.id).emit('sendLoginStatus', data);
}

module.exports = sendLoginStatus;