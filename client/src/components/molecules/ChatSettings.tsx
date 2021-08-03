import React from 'react';
import styled from 'styled-components';

import Button from '../atoms/Button';
import ButtonIcon from '../atoms/ButtonIcon';

interface IChatSettings {
    userId: string;
    adminId: string;
    onChangeCardClick: (type: string) => void;
    onAdminSetClick: () => void;
    onKickClick: () => void;
}

const Container = styled.div`
    width: 100%;
    height: 15%;
    background: ${({theme}) => theme.primaryHover};
    display: flex;
    align-items: center;
    padding: 15px 15px;
`

const StyledButton = styled(Button)`
    &:nth-child(2) {
        margin-left: 15px;
    }
`

const StyledButtonIcon = styled(ButtonIcon)`
    margin-left: auto;
`

const ChatSettings = ({userId, adminId, onChangeCardClick, onAdminSetClick, onKickClick}: IChatSettings) => {
    return (
        <Container>
            {
                userId === adminId && (
                    <>
                        <StyledButton onClick={onAdminSetClick} lightHover={true}>set as admin</StyledButton>
                        <StyledButton onClick={onKickClick} lightHover={true}>kick</StyledButton>
                    </>
                )
            }
            <StyledButtonIcon fontSize="1.6em" onClick={() => onChangeCardClick('messages')} iconType="comments" />
        </Container>
    );
};

export default ChatSettings;