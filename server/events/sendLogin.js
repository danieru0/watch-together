const sendLogin = (io, socket, login) => {
    io.to(socket.id).emit('sendLogin', login);
}

module.exports = sendLogin;