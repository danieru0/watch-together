import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface AuthState {
    login: string;
    userId: string;
}

const initialState: AuthState = {
    login: '',
    userId: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<{login: string, userId: string}>) => {
            state.login = action.payload.login;
            state.userId = action.payload.userId;
        }
    }
})

export const { setLogin } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;