import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { BasicRoomData } from '../../types/types';

interface RoomState {
    passwordAfterCreation: string;
    roomIdFromLink: string;
    roomName: string;
    basicRoomData: BasicRoomData | null
}

const initialState: RoomState = {
    passwordAfterCreation: '',
    roomIdFromLink: '',
    roomName: '',
    basicRoomData: null
}

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setPasswordAfterCreation: (state, action: PayloadAction<string>) => {
            state.passwordAfterCreation = action.payload;
        },
        setRoomIdFromLink: (state, action: PayloadAction<string>) => {
            state.roomIdFromLink = action.payload;
        },
        setRoomName: (state, action: PayloadAction<string>) => {
            state.roomName = action.payload;
        },
        setBasicRoomData: (state, action: PayloadAction<BasicRoomData>) => {
            state.basicRoomData = {...action.payload};
        }
    }
})

export const { setPasswordAfterCreation, setRoomIdFromLink, setRoomName, setBasicRoomData } = roomSlice.actions;

export const selectRoom = (state: RootState) => state.room;

export default roomSlice.reducer;