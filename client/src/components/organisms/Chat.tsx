import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSocketContext } from '../../context/socketContext';

import { ActiveUsers, ChatMessage } from '../../types/types';

import ChatMessages from '../molecules/ChatMessages';
import ChatInput from '../molecules/ChatInput';

import ChatUsers from '../molecules/ChatUsers';
import ChatSettings from '../molecules/ChatSettings';

interface IChat {
    activeUsers: ActiveUsers[];
    adminId: string;
    userId: string;
    roomId: string;
    mobileChatActive: boolean;
}

interface ContainerProps {
    mobileChatActive: boolean;
}

const Container = styled.div<ContainerProps>`
    width: 30%;
    height: 100%;
    background: ${({theme}) => theme.primary};
    display: flex;
    flex-direction: column;

    @media (max-width: 1230px) {
        width: 38%;
    }

    @media (max-width: 1000px) {
        width: 370px;
        position: absolute;
        right: 0;
        box-shadow: -10px 0px 40px 10px #000;
        transition: transform .8s cubic-bezier(1, 0, 0, 1);
        transform: ${({mobileChatActive}) => mobileChatActive ? 'translateX(0)' : 'translateX(110%)'};
    }

    @media (max-width: 410px) {
        width: 100%;
    }
`

const Chat = ({activeUsers, adminId, userId, roomId, mobileChatActive}: IChat) => {
    const socket = useSocketContext();
    const [activeCard, setActiveCard] = useState('messages');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const handleChangeCardClick = (type: string) => {
        setActiveCard(type);
    }

    const handleUserClick = (clickedUserId: string) => {
        if (adminId === userId) {
            setSelectedUserId(clickedUserId);
        }
    }

    const handleSetAdminClick = () => {
        if (selectedUserId && socket && (adminId === userId)) {
            socket.emit('requestAdminChange', roomId, selectedUserId);
            setSelectedUserId('');
        }
    }

    const handleKickClick = () => {
        if (selectedUserId && socket && (adminId === userId)) {
            socket.emit('requestKickFromRoom', roomId, selectedUserId);
            setSelectedUserId('');
        }
    }

    const handleChatInput = (text: string) => {
        if (socket) {
            socket.emit('requestSendMessage', roomId, text);
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on('sendMessage', data => {
                setMessages(prev => [...prev, data])
            })
        }

        return () => {socket && socket.off('sendMessage')}
    }, [socket])

    return (
        <Container mobileChatActive={mobileChatActive}>
            {
                activeCard === 'messages' ? (
                    <>
                        <ChatMessages messages={messages} />
                        <ChatInput onSubmit={handleChatInput} onChangeCardClick={handleChangeCardClick} />
                    </>
                ) : (
                    <>
                        <ChatUsers selectedUserId={selectedUserId} handleUserClick={handleUserClick} userId={userId} activeUsers={activeUsers} adminId={adminId} />
                        <ChatSettings onKickClick={handleKickClick} onAdminSetClick={handleSetAdminClick} userId={userId} adminId={adminId} onChangeCardClick={handleChangeCardClick} />
                    </>
                )
            }

        </Container>
    );
};

export default Chat;