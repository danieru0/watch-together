const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket, roomId) => {
    const { sendRoomsListUpdate, sendRoomCurrentAdminId, sendRoomUsers, sendMessage } = events;

    if (rooms[roomId]) {
        const selectedRoom = rooms[roomId];
        let userLogin;
        socket.leave(roomId);
        selectedRoom.activeUsers.forEach((user, index) => {
            if (user[socket.id]) {
                userLogin = user[socket.id];
                selectedRoom.activeUsers.splice(index, 1);
            }
        })

        if (selectedRoom.activeUsers.length === 0) {
            delete rooms[roomId];
        } else {
            if (selectedRoom.currentAdminId === socket.id) {
                const firstActiveUser = Object.keys(selectedRoom.activeUsers[0])[0];
                const firstActiveUserLogin = selectedRoom.activeUsers.filter(user => Object.keys(user)[0] === firstActiveUser)[0];
                
                selectedRoom.currentAdminId = firstActiveUser;

                sendRoomCurrentAdminId(io, socket, roomId, selectedRoom);
                sendMessage(io, socket, roomId, '', '', `User ${firstActiveUserLogin[firstActiveUser]} is new admin of this room!`);
            }
        }

        sendRoomsListUpdate(io, socket);
        sendRoomUsers(io, socket, roomId, selectedRoom);
        userLogin && sendMessage(io, socket, roomId, '', '', `User ${userLogin} has left the room!`);
    }
}