const events = require('../events');
const { users } = require('../data/data');

module.exports = (io, socket) => {
    socket.on('requestLogin', login => {
        const { sendLogin, sendError } = events;

        if (users.hasOwnProperty(socket.id) && users[socket.id] === null) {
            users[socket.id] = login;

            sendLogin(io, socket, login);
        } else {
            sendError(io, socket, "You are already logged in!");
        }
    })
}