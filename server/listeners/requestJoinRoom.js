const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestJoinRoom', (roomId, password) => {
        const { sendJoinRoomConnectionStatus, sendError } = events;
        
        if (rooms[roomId]) {
            if (rooms[roomId].password === password) {
                sendJoinRoomConnectionStatus(io, socket, roomId, true);
            } else {
                sendJoinRoomConnectionStatus(io, socket, roomId, false);
            }
        } else {
            sendError('Room with this id does not exists!');
        }
    })
}