const handleLeaveRoom = require('../helpers/handleLeaveRoom');

module.exports = (io, socket) => {
    socket.on('requestLeaveRoom', roomId => {
        handleLeaveRoom(io, socket, roomId);
    })
}