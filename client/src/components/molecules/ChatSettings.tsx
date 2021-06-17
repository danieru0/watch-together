import React from 'react';
import styled from 'styled-components';

import Button from '../atoms/Button';
import ButtonIcon from '../atoms/ButtonIcon';

interface IChatSettings {
    onChangeCardClick: (type: string) => void;
}

const Container = styled.div`
    width: 100%;
    height: 15%;
    background: ${({theme}) => theme.primaryHover};
    display: flex;
    align-items: center;
    padding: 0px 15px;
`

const StyledButton = styled(Button)`
    &:nth-child(2) {
        margin-left: 15px;
    }
`

const StyledButtonIcon = styled(ButtonIcon)`
    margin-left: auto;
`

const ChatSettings = ({onChangeCardClick}: IChatSettings) => {
    return (
        <Container>
            <StyledButton lightHover={true}>set admin</StyledButton>
            <StyledButton lightHover={true}>kick</StyledButton>
            <StyledButtonIcon fontSize="1.6em" onClick={() => onChangeCardClick('messages')} iconType="comments" />
        </Container>
    );
};

export default ChatSettings;