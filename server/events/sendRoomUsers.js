const sendRoomUsers = (io, socket, roomData, roomId) => {
    const activeUsers = roomData.activeUsers;

    io.to(roomId).emit('sendRoomUsers', activeUsers);
}

module.exports = sendRoomUsers;