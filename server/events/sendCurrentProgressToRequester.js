const sendCurrentProgressToRequester = (io, socket, requesterId, progress) => {
    io.to(requesterId).emit('sendCurrentProgressToRequester', progress);
}

module.exports = sendCurrentProgressToRequester;