const events = require('../events');

const data = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestLogout', () => {
        const { sendLogout, sendError } = events;

        if (data.hasOwnProperty(socket.id) && data[socket.id] !== null) {
            data[socket.id] = null;

            sendLogout(io, socket);
        } else {
            sendError(io, socket, "You are not logged in!");
        }
    });
}