const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestKickFromRoom', (roomId, userId) => {
        const { sendRoomUsers, sendKickFromRoomResponseUser, sendNotificationToUser, sendMessage } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];
            const userIdSocket = io.sockets.sockets.get(userId);
            let userLogin;
            if (selectedRoom.currentAdminId === socket.id) {
                selectedRoom.activeUsers.forEach((user, index) => {
                    if (user[userId]) {
                        userLogin = user[userId];
                        selectedRoom.activeUsers.splice(index, 1);
                    }
                })

                userIdSocket.leave(roomId);

                sendKickFromRoomResponseUser(io, socket, userId);
                sendRoomUsers(io, socket, selectedRoom, roomId);
                sendNotificationToUser(io, socket, 'Success!', 'User has been kicked!', 'success');
                sendMessage(io, socket, roomId, '', '', `User ${userLogin} has been kicked!`);
            }
        }
    })
}