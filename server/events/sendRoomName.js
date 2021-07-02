const sendRoomName = (io, socket, roomId, roomData) => {
    const roomName = roomData.name;

    io.to(roomId).emit('sendRoomName', roomName);
}

module.exports = sendRoomName;