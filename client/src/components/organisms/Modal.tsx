import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { selectRoom } from '../../features/room/roomSlice';
import { selectModal, setModalActive } from '../../features/modal/modalSlice';

import RoomSettingsModal from '../molecules/RoomSettingsModal';

const Container = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 9999999999;
`

const Modal = () => {
    const dispatch = useAppDispatch();
    const modalSelector = useAppSelector(selectModal);
    const roomSelector = useAppSelector(selectRoom);

    const handleCloseModal = () => {
        dispatch(setModalActive({
            active: false,
            type: null,
            id: ''
        }))
    }

    const renderModalComponent = () => {
        switch(modalSelector.type) {
            case 'settings' :
                return <RoomSettingsModal roomId={modalSelector.roomId} onCloseClick={handleCloseModal} basicRoomData={roomSelector.basicRoomData} />
            default: return null;
        }
    }

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            const target = e.target as Element;

            if (target.id === 'modal-bg') {
                dispatch(setModalActive({
                    active: false,
                    type: null,
                    id: ''
                }))
            }
        }

        document.addEventListener('click', clickOutside);

        return () => document.removeEventListener('click', clickOutside);
    }, [dispatch]);

    if (!modalSelector.active) return null;

    return (
        <Container id="modal-bg">
            {renderModalComponent()}
        </Container>
    );
};

export default Modal;