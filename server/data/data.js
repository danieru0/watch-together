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
            ];
            currentAdminId: id;
            videoLink: string;
            videoId: string | null;
            videoType: string;
            videoDurationSeconds: number;
            videoPlaying: boolean;
        }
    }
*/

const users = {};

const rooms = {};

module.exports = { users, rooms };