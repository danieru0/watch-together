const sendLogin = (io, socket, login, id) => {
    io.to(socket.id).emit('sendLogin', login, id);
}

module.exports = sendLogin;