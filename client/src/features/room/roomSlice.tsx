import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface RoomState {
    passwordAfterCreation: string;
    roomIdFromLink: string;
    roomName: string;
}

const initialState: RoomState = {
    passwordAfterCreation: '',
    roomIdFromLink: '',
    roomName: '',
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
        }
    }
})

export const { setPasswordAfterCreation, setRoomIdFromLink, setRoomName } = roomSlice.actions;

export const selectRoom = (state: RootState) => state.room;

export default roomSlice.reducer;