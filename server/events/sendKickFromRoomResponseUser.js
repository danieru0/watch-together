const sendKickFromRoomResponseUser = (io, socket, userId) => {
    io.to(userId).emit('sendKickFromRoomResponseUser');
}

module.exports = sendKickFromRoomResponseUser;