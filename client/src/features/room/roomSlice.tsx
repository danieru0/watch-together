import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface RoomState {
    passwordAfterCreation: string;
    roomIdFromLink: string;
}

const initialState: RoomState = {
    passwordAfterCreation: '',
    roomIdFromLink: ''
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
        }
    }
})

export const { setPasswordAfterCreation, setRoomIdFromLink } = roomSlice.actions;

export const selectRoom = (state: RootState) => state.room;

export default roomSlice.reducer;