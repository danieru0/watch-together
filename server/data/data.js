/*
    users: {
        userId: login
    }

    rooms: {
        roomId: {
            name: string;
            password: string;
            type: public | private;
            admminControl: boolean;
            usersNumberMax: number from 2 to 6
            activeUsers: [
                { userId: login }
            ],
            currentAdminId: id
        }
    }
*/

const users = {};

const rooms = {};

module.exports = { users, rooms };