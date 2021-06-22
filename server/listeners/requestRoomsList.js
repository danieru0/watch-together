const events = require('../events');

module.exports = (io, socket) => {
    socket.on('requestRoomsList', () => {
        const { sendRoomsListUpdate } = events;

        sendRoomsListUpdate(io, socket);
    })
}
