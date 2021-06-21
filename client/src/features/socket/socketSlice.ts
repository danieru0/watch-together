import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Socket } from 'socket.io-client';

interface SocketState {
    socket: Socket | null;
}

const initialState: SocketState = {
    socket: null
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<any>) => {
            state.socket = action.payload;
        }
    }
})

export const { setSocket } = socketSlice.actions;

export const selectSocket = (state: RootState) => state.socket;

export default socketSlice.reducer;