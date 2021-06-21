const events = require('../events');

const data = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestLogin', login => {
        const { sendLogin, sendError } = events;

        if (data.hasOwnProperty(socket.id) && data[socket.id] === null) {
            data[socket.id] = login;

            sendLogin(io, socket, login);
        } else {
            sendError(io, socket, "You are already logged in!");
        }
    })
}