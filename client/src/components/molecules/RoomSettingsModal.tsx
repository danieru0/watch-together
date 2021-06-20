import React from 'react';
import styled from 'styled-components';

import FormikRoom, { InitialValues } from './FormikRoom';
import ButtonIcon from '../atoms/ButtonIcon';

const Container = styled.div`
    background: ${({theme}) => theme.secondary};
    padding: 50px 150px;
    position: relative;
`

const StyledButtonIcon = styled(ButtonIcon)`
    position: absolute;
    top: -14px;
    right: -14px;
`

const RoomSettingsModal = () => {
    const handleCloseModalButton = () => {

    }

    const handleSettingsSubmit = (values: InitialValues) => {
        console.log(handleSettingsSubmit);
    }

    return (
        <Container>
            <StyledButtonIcon fontSize="1.5em" onClick={handleCloseModalButton} iconType="times" />
            <FormikRoom onSubmit={handleSettingsSubmit} formikType="settings" />
        </Container>
    );
};

export default RoomSettingsModal;