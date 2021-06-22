const sendLogout = (io, socket) => {
    io.to(socket.id).emit('sendLogout');
}

module.exports = sendLogout;