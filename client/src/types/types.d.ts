export interface RoomDataListInterface {
    [id: string]: {
        name: string;
        activeUsers: number;
        usersNumberMax: number;
        id: string;
    }
}