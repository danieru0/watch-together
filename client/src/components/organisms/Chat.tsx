import React, { useState } from 'react';
import styled from 'styled-components';

import { ActiveUsers } from '../../types/types';

import ChatMessages from '../molecules/ChatMessages';
import ChatInput from '../molecules/ChatInput';

import ChatUsers from '../molecules/ChatUsers';
import ChatSettings from '../molecules/ChatSettings';

interface IChat {
    activeUsers: ActiveUsers[];
    adminId: string;
    userId: string;
}

const Container = styled.div`
    width: 30%;
    height: 100%;
    background: ${({theme}) => theme.primary};
`

const Chat = ({activeUsers, adminId, userId}: IChat) => {
    const [activeCard, setActiveCard] = useState('messages');
    const [selectedUserId, setSelectedUserId] = useState('');

    const handleChangeCardClick = (type: string) => {
        setActiveCard(type);
    }

    const handleUserClick = (clickedUserId: string) => {
        if (adminId === userId) {
            setSelectedUserId(clickedUserId);
        }
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
                        <ChatUsers selectedUserId={selectedUserId} handleUserClick={handleUserClick} userId={userId} activeUsers={activeUsers} adminId={adminId} />
                        <ChatSettings userId={userId} adminId={adminId} onChangeCardClick={handleChangeCardClick} />
                    </>
                )
            }

        </Container>
    );
};

export default Chat;