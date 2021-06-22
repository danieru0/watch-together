const events = require('../events');
const { rooms } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestRoomPasswordExist', roomId => {
        const { sendRoomPasswordExist } = events;

        if (rooms[roomId].password) {
            sendRoomPasswordExist(io, socket, true, roomId);
        } else {
            sendRoomPasswordExist(io, socket, false, roomId);
        }
    })
}