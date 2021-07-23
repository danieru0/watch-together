const sendMessage = (io, socket, roomId, userLogin, userMessage, serverMessage) => {
    if (serverMessage) {
        io.to(roomId).emit('sendMessage', {
            message: serverMessage
        })
    } else {
        io.to(roomId).emit('sendMessage', {
            login: userLogin,
            message: userMessage.trim()
        })
    }
}

module.exports = sendMessage;