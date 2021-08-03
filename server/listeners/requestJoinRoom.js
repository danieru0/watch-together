const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestJoinRoom', (roomId, password, login) => {
        const { sendJoinRoomConnectionStatus, sendRoomsListUpdate, sendError, sendMessage } = events;

        if (rooms[roomId]) {
            if (rooms[roomId].password === password) {
                socket.join(roomId);
                rooms[roomId].activeUsers.push({ [socket.id]: login  });

                sendJoinRoomConnectionStatus(io, socket, roomId, true);
                sendRoomsListUpdate(io, socket);
                sendMessage(io, socket, roomId, undefined, '', `User ${login} has connected to the room!`);
            } else {
                sendJoinRoomConnectionStatus(io, socket, roomId, false);
            }
        } else {
            sendError('Room with this id does not exists!');
        }
    })
}