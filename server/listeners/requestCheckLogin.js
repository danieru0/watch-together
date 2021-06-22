const events = require('../events');
const { users } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestCheckLogin', () => {
        const { sendLoginStatus } = events;

        if (users[socket.id]) {
            sendLoginStatus(io, socket, true);
        } else {
            sendLoginStatus(io, socket, false);
        }
    })
}