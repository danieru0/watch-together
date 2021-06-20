import React, { useState } from 'react';
import styled from 'styled-components';

import ChatMessages from '../molecules/ChatMessages';
import ChatInput from '../molecules/ChatInput';

import ChatUsers from '../molecules/ChatUsers';
import ChatSettings from '../molecules/ChatSettings';

const Container = styled.div`
    width: 30%;
    height: 100%;
    background: ${({theme}) => theme.primary};
`

const Chat = () => {
    const [activeCard, setActiveCard] = useState('messages');

    const handleChangeCardClick = (type: string) => {
        setActiveCard(type);
    }

    return (
        <Container>
            {
                activeCard === 'messages' ? (
                    <>
                        <ChatMessages />
                        <ChatInput onChangeCardClick={handleChangeCardClick} />
                    </>
                ) : (
                    <>
                        <ChatUsers />
                        <ChatSettings onChangeCardClick={handleChangeCardClick} />
                    </>
                )
            }

        </Container>
    );
};

export default Chat;