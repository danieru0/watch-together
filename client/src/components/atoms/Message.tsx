import React from 'react';
import styled from 'styled-components';

import { ChatMessage } from '../../types/types';


const Container = styled.li`
    display: flex;
    font-size: 1.2em;
    margin: 5px 0px;
`

const Nick = styled.span`
    color: ${({theme}) => theme.fontcolorSecondary};
`

const UserMessage = styled.span`
    color: ${({theme}) => theme.fontColorPrimary};
    margin-left: 5px;
`

const Message = ({login, message}: ChatMessage) => {
    return (
        <Container>
            <Nick>{`${login}:`}</Nick>
            <UserMessage>{message}</UserMessage>
        </Container>
    );
};

export default Message;