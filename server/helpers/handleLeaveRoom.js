const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket, roomId) => {
    const { sendRoomsListUpdate, sendRoomCurrentAdminId, sendRoomUsers } = events;

    if (rooms[roomId]) {
        const selectedRoom = rooms[roomId];
        socket.leave(roomId);
        selectedRoom.activeUsers.forEach((user, index) => {
            user[socket.id] && selectedRoom.activeUsers.splice(index, 1);
        })

        if (selectedRoom.activeUsers.length === 0) {
            delete rooms[roomId];
        } else {
            if (selectedRoom.currentAdminId === socket.id) {
                const firstActiveUser = Object.keys(selectedRoom.activeUsers[0])[0];
                
                selectedRoom.currentAdminId = firstActiveUser;

                sendRoomCurrentAdminId(io, socket, roomId, selectedRoom);
            }
        }

        sendRoomsListUpdate(io, socket);
        sendRoomUsers(io, socket, roomId, selectedRoom);
    }
}