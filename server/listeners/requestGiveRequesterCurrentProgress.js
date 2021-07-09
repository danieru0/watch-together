const events = require('../events');

module.exports = (io, socket) => {
    socket.on('requestGiveRequesterCurrentProgress', data => {
        const { sendCurrentProgressToRequester } = events;

        sendCurrentProgressToRequester(io, socket, data.requester, data.progress);
    })
}