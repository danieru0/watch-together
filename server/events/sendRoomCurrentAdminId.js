const sendRoomCurrentAdminId = (io, socket, roomId, roomData) => {
    const currentAdmin = roomData.currentAdminId;

    io.to(roomId).emit('sendRoomCurrentAdminId', currentAdmin);
}

module.exports = sendRoomCurrentAdminId;