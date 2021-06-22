const { rooms } = require('../data/data');

const sendRoomsListUpdate = (io, socket) => {
    const roomsDataForListing = {};

    Object.keys(rooms).forEach((roomId) => {
        const room = rooms[roomId];

        if (room.type === 'public') {
            roomsDataForListing[roomId] = {
                name: room.name,
                activeUsers: room.activeUsers.length,
                usersNumberMax: room.usersNumberMax,
                id: roomId
            }
        }
    });

    io.emit('sendRoomsListUpdate', roomsDataForListing);
}

module.exports = sendRoomsListUpdate;