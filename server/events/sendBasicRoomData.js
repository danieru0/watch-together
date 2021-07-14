const sendBasicRoomData = (io, socket, roomId, roomData) => {
    io.to(roomId).emit('sendBasicRoomData', {
        adminControl: roomData.adminControl,
        usersNumberMax: roomData.usersNumberMax,
        type: roomData.type,
        roomName: roomData.name
    })
}

module.exports = sendBasicRoomData;