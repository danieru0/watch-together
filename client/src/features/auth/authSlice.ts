import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface AuthState {
    login: string;
}

const initialState: AuthState = {
    login: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        }
    }
})

export const { setLogin } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;