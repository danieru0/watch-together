const events = require('../events');

const data = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestCheckLogin', () => {
        const { sendLoginStatus } = events;

        if (data[socket.id]) {
            sendLoginStatus(io, socket, true);
        } else {
            sendLoginStatus(io, socket, false);
        }
    })
}