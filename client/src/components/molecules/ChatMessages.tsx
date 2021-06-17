import React from 'react';
import styled from 'styled-components';

import Message from '../atoms/Message';

const Container = styled.div`
    width: 100%;
    height: 85%;
    overflow-y: auto;
    padding: 5px 10px;
`

const List = styled.ul`
    list-style: none;
`

const ChatMessages = () => {
    return (
        <Container>
            <List>
                <Message />
            </List>
        </Container>
    );
};

export default ChatMessages;