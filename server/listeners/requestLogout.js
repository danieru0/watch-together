const events = require('../events');
const { users } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestLogout', () => {
        const { sendLogout, sendError } = events;

        if (users.hasOwnProperty(socket.id) && users[socket.id] !== null) {
            users[socket.id] = null;

            sendLogout(io, socket);
        } else {
            sendError(io, socket, "You are not logged in!");
        }
    });
}