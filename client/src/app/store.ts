import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import roomReducer from '../features/room/roomSlice';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
  	reducer: {
		  auth: authReducer,
		  room: roomReducer,
		  modal: modalReducer
  	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  	ReturnType,
  	RootState,
  	unknown,
  	Action<string>
>;
