const events = require('../events');
const { users, rooms } = require('../data/data');
const { v4: uuidv4 } = require('uuid');

module.exports = (io, socket) => {
    socket.on('requestCreateRoom', values => {
        const { sendRoomCreationStatus, sendRoomsListUpdate, sendError } = events;

        if (users[socket.id]) {
            const id = uuidv4();
            rooms[id] = {
                name: values.roomName,
                password: values.password,
                type: values.type,
                adminControl: values.adminControl,
                usersNumberMax: values.usersNumber,
                activeUsers: [],
                currentAdminId: socket.id,
                videoLink: '',
                videoId: '',
                videoType: 'youtube'
            }

            sendRoomCreationStatus(io, socket, id);
            sendRoomsListUpdate(io, socket);
        } else {
            sendError(io, socket, "You are not logged in!");
        }
    })
}