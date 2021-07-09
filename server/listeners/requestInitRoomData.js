const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestInitRoomData', roomId => {
        const { sendRoomUsers, sendRoomCurrentAdminId, sendRoomName, sendRoomVideoUrl, sendRoomVideoType, sendPlayingStatusToClient } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];

            sendRoomUsers(io, socket, roomId, selectedRoom);
            sendRoomCurrentAdminId(io, socket, roomId, selectedRoom);
            sendRoomName(io, socket, roomId, selectedRoom);
            sendRoomVideoUrl(io, socket, roomId, selectedRoom);
            sendRoomVideoType(io, socket, roomId, selectedRoom);
            sendPlayingStatusToClient(io, socket, selectedRoom);
        }
    })
}