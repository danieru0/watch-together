import React from 'react';
import styled from 'styled-components';

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
    return (
        <Container>
            <RoomSettingsModal />
        </Container>
    );
};

export default Modal;