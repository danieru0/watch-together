const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestKickFromRoom', (roomId, userId) => {
        const { sendRoomUsers, sendKickFromRoomResponseUser,  sendKickFromRoomResponseAdmin} = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];
            const userIdSocket = io.sockets.sockets.get(userId);
            if (selectedRoom.currentAdminId === socket.id) {
                selectedRoom.activeUsers.forEach((user, index) => {
                    user[userId] && selectedRoom.activeUsers.splice(index, 1);
                })

                userIdSocket.leave(roomId);

                sendKickFromRoomResponseUser(io, socket, userId);
                sendRoomUsers(io, socket, selectedRoom, roomId);
                sendKickFromRoomResponseAdmin(io, socket);
            }
        }
    })
}