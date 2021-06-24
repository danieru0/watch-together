import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

import { selectAuth } from '../features/auth/authSlice';

import { useSocketContext } from '../context/socketContext';

import { ActiveUsers } from '../types/types';

import VideoNav from '../components/molecules/VideoNav'
import YoutubeVideo from '../components/molecules/YoutubeVideo';
import Chat from '../components/organisms/Chat';

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 1600px;
    height: 100%;
    padding: 50px 0px;
    display: flex;
    flex-direction: column;
`

const VideoWrapper = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    margin-top: 30px;
    justify-content: space-between;
`

const Room = () => {
    const socket = useSocketContext();
    const { id } = useParams<{id: string}>();
    const authSelector = useAppSelector(selectAuth);
    const [activeUsers, setActiveUsers] = useState<ActiveUsers[]>([]);
    const [adminId, setAdminId] = useState('');

    useEffect(() => {
        if (socket) {
            socket.emit('requestInitRoomData', id);

            socket.on('sendRoomUsers', users => {
                setActiveUsers(users);
            });

            socket.on('sendRoomCurrentAdminId', adminId => {
                setAdminId(adminId);
            })
        }

        return () => {
            if (socket) {
                socket.off('sendRoomUsers');
                socket.off('sendRoomCurrentAdminId');
            }
        }
    }, [socket, id]);

    return (
        <Container>
            <Wrapper>                
                <VideoNav />
                <VideoWrapper>
                    <YoutubeVideo />
                    <Chat userId={authSelector.userId} adminId={adminId} activeUsers={activeUsers} />
                </VideoWrapper>
            </Wrapper>
        </Container>
    );
};

export default Room;