const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestRoomSettingsUpdate', (roomId, data) => {
        const { sendBasicRoomData, sendRoomsListUpdate, sendRoomName } = events;

        if (rooms[roomId]) {
            const selectedRoom = rooms[roomId];

            if (selectedRoom.currentAdminId === socket.id) {
                if (selectedRoom.activeUsers.length <= data.usersNumberMax) {
                    selectedRoom.adminControl = data.adminControl;
                    selectedRoom.type = data.type;
                    selectedRoom.usersNumberMax = data.usersNumberMax;
                    selectedRoom.name = data.roomName;
    
                    sendBasicRoomData(io, socket, roomId, selectedRoom);
                    sendRoomsListUpdate(io, socket);
                    sendRoomName(io, socket, roomId, selectedRoom)
                }
            }
        }
    })
}