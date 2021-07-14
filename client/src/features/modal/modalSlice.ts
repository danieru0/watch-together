import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type ModalType = 'settings' | null;

interface ModalState {
    active: boolean;
    type: ModalType;
    roomId: string;
}

const initialState: ModalState = {
    active: false,
    type: null,
    roomId: ''
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalActive: (state, action: PayloadAction<{active: boolean, type: ModalType, id: string}>) => {
            state.active = action.payload.active;
            state.type = action.payload.type;
            state.roomId = action.payload.id;
        }
    }
})

export const { setModalActive } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;