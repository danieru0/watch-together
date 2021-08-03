const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestAdminChange', (roomId, userId) => {
        const { sendRoomCurrentAdminId, sendMessage, sendNotificationToUser } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];

            if (selectedRoom.currentAdminId === socket.id) {
                const selectedUser = selectedRoom.activeUsers.filter(user => user[userId])[0];

                selectedRoom.currentAdminId = userId;

                sendRoomCurrentAdminId(io, socket, roomId, selectedRoom);
                sendMessage(io, socket, roomId, '', '', `User ${selectedUser[userId]} is new admin of this room!`);
                sendNotificationToUser(io, socket, 'Success!', 'Admin has been changed!', 'success');
            }
        }
    })
}