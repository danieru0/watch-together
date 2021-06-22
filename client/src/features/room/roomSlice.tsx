import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface RoomState {
    passwordAfterCreation: string;
}

const initialState: RoomState = {
    passwordAfterCreation: ''
}

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setPasswordAfterCreation: (state, action: PayloadAction<string>) => {
            state.passwordAfterCreation = action.payload;
        }
    }
})

export const { setPasswordAfterCreation } = roomSlice.actions;

export const selectRoom = (state: RootState) => state.room;

export default roomSlice.reducer;