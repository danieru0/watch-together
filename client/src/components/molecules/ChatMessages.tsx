import React from 'react';
import styled from 'styled-components';

import { ChatMessage } from '../../types/types';

import Message from '../atoms/Message';

interface IChatMessages {
    messages: ChatMessage[]
}

const Container = styled.div`
    width: 100%;
    height: 85%;
    padding: 5px 10px;
    overflow-y: auto;
`

const List = styled.ul`
    list-style: none;
    height: 100px;
`

const ChatMessages = ({messages}: IChatMessages) => {
    return (
        <Container>
            <List>
                {
                    messages.length !== 0 && messages.map((item, index) => {
                        return (
                            <Message key={index} login={item.login} message={item.message} />
                        )
                    })
                }
            </List>
        </Container>
    );
};

export default ChatMessages;