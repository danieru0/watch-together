const sendMessage = (io, socket, roomId, userLogin, userMessage) => {
    io.to(roomId).emit('sendMessage', {
        login: userLogin,
        message: userMessage.trim()
    })
}

module.exports = sendMessage;