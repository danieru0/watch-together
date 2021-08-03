const sendNotificationToUser = (io, socket, title, message, type) => {
    io.to(socket.id).emit('sendNotificationToUser', title, message, type);
}

module.exports = sendNotificationToUser;