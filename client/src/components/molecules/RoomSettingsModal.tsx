import React from 'react';
import styled from 'styled-components';

import { useSocketContext } from '../../context/socketContext';

import FormikRoom, { InitialValues } from './FormikRoom';
import ButtonIcon from '../atoms/ButtonIcon';

import { BasicRoomData } from '../../types/types';

interface IRoomSettingsModal {
    basicRoomData: BasicRoomData | null
    roomId: string;
    onCloseClick: () => void;
}

const Container = styled.div`
    background: ${({theme}) => theme.secondary};
    padding: 50px 150px;
    position: relative;

    @media (max-width: 735px) {
        padding: 50px 0px;
        width: 90%;
    }

    @media (max-width: 515px) {
        width: 100%;
        height: 100%;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const StyledButtonIcon = styled(ButtonIcon)`
    position: absolute;
    top: -14px;
    right: -14px;

    @media (max-width: 735px) {
        top: 0;
        right: 0;
    }
`

const RoomSettingsModal = ({basicRoomData, roomId, onCloseClick}: IRoomSettingsModal) => {
    const socket = useSocketContext();
    
    const handleSettingsSubmit = (values: InitialValues) => {
        if (!socket) return false;

        socket.emit('requestRoomSettingsUpdate', roomId, {
            adminControl: values.adminControl,
            usersNumberMax: values.usersNumber,
            type: values.type,
            roomName: values.roomName
        });

        onCloseClick();
    }

    return (
        <Container>
            <StyledButtonIcon fontSize="1.5em" onClick={onCloseClick} iconType="times" />
            <FormikRoom basicRoomData={basicRoomData} onSubmit={handleSettingsSubmit} formikType="settings" />
        </Container>
    );
};

export default RoomSettingsModal;