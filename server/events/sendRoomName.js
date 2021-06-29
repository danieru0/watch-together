const sendRoomName = (io, socket, roomData, roomId) => {
    const roomName = roomData.name;

    io.to(roomId).emit('sendRoomName', roomName);
}

module.exports = sendRoomName;