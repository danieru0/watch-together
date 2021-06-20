const events = require('../events');

module.exports = io => {
    io.on('connection', socket => {
        const { connected } = events;

        connected(socket);        
    })
}