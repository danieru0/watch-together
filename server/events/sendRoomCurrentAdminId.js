const sendRoomCurrentAdminid = (io, socket, roomData, roomId) => {
    const currentAdmin = roomData.currentAdminId;

    io.to(roomId).emit('sendRoomCurrentAdminId', currentAdmin);
}

module.exports = sendRoomCurrentAdminid;