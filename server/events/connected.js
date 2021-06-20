const connected = socket => {
    socket.emit('connected');
    console.log('aaa');
}

module.exports = connected;