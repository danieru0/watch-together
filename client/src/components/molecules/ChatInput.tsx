import React from 'react';
import styled from 'styled-components';

import Button from '../atoms/Button';
import ButtonIcon from '../atoms/ButtonIcon';

interface IChatInput {
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

const Input = styled.input`
    height: 40px;
    width: 200px;
    font-size: 1em;
    background: ${({theme}) => theme.functional};
    border: none;
    outline: none;
    color: #fff;
    padding: 0px 5px;
    margin-right: 10px;
`

const StyledButtonIcon = styled(ButtonIcon)`
    margin-left: auto;
`

const ChatInput = ({onChangeCardClick}: IChatInput) => {
    return (
        <Container>
            <Input placeholder="Your message..." />
            <Button lightHover={true}>send</Button>
            <StyledButtonIcon fontSize="1.6em" onClick={() => onChangeCardClick('users')} iconType="user" />
        </Container>
    );
};

export default ChatInput;