import React from 'react';
import styled from 'styled-components';

import { ChatMessage } from '../../types/types';


const Container = styled.li`
    display: flex;
    font-size: 1.2em;
    margin: 5px 0px;
`

interface UserMessageProps {
    servermessage?: string;
}

const Nick = styled.span`
    color: ${({theme}) => theme.fontcolorSecondary};
`

const UserMessage = styled.span<UserMessageProps>`
    color: ${({theme, servermessage}) => servermessage ? theme.fontColorPrimary : theme.red};
    word-break: break-all;
    margin-left: ${({servermessage}) => servermessage && '5px'};
`

const Message = ({login, message}: ChatMessage) => {
    return (
        <Container>
            {login && <Nick>{`${login}:`}</Nick>}
            <UserMessage servermessage={login}>{message}</UserMessage>
        </Container>
    );
};

export default Message;