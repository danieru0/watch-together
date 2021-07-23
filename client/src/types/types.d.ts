// userId: login
export interface ActiveUsers {
    [userId: string]: string;
}

export interface RoomDataListInterface {
    [id: string]: {
        name: string;
        activeUsers: number;
        usersNumberMax: number;
        id: string;
    }
}

export interface BasicRoomData {
    adminControl: boolean;
    usersNumberMax: number;
    type: RoomType;
    roomName: string;
}

export interface ChatMessage {
    login?: string;
    message: string;
}