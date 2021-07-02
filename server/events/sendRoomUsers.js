const sendRoomUsers = (io, socket, roomId, roomData) => {
    const activeUsers = roomData.activeUsers;

    io.to(roomId).emit('sendRoomUsers', activeUsers);
}

module.exports = sendRoomUsers;