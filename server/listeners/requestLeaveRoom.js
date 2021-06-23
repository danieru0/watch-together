const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestLeaveRoom', roomId => {
        const { sendRoomsListUpdate } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];
            socket.leave(roomId);
            selectedRoom.activeUsers.forEach((user, index) => {
                user[socket.id] && selectedRoom.activeUsers.splice(index, 1);
            })

            if (selectedRoom.activeUsers.length === 0) {
                delete rooms[roomId];
            }

            sendRoomsListUpdate(io, socket);
        }
    })
}