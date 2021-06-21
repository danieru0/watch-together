const connected = socket => {
    socket.emit('connected', 'bubu');
    console.log('aaa');
}

module.exports = connected;