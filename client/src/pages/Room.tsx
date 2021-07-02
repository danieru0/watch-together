import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectAuth } from '../features/auth/authSlice';
import { setRoomName } from '../features/room/roomSlice';

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

const ExtLink = styled.p`
    font-size: 10em;
`

const Room = () => {
    const socket = useSocketContext();
    const { id } = useParams<{id: string}>();
    const history = useHistory();
    const dispatch = useAppDispatch();
    const authSelector = useAppSelector(selectAuth);
    const [activeUsers, setActiveUsers] = useState<ActiveUsers[]>([]);
    const [adminId, setAdminId] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [videoId, setVideoId] = useState('');
    const [videoType, setVideoType] = useState('youtube');

    const handleVideoLinkChange = (link: string, linkId: string) => {
        if (socket) {
            socket.emit('requestSetRoomVideoUrl', id, link, linkId);
        }
    }

    const handleVideoTypeChange = (type: string) => {
        if (socket) {
            socket.emit('requestSetRoomVideoType', id, type);
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on('sendRoomVideoUrl', (link, id) => {
                setVideoLink(link);
                setVideoId(id);
            })

            socket.on('sendRoomVideoType', type => {
                setVideoType(type);
            })
        }

        return () => {
            if (socket) {
                socket.off('sendRoomVideoUrl');
                socket.off('sendRoomVideoType');
            } 
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.emit('requestInitRoomData', id);

            socket.on('sendRoomUsers', users => {
                setActiveUsers(users);
            })

            socket.on('sendRoomCurrentAdminId', adminId => {
                setAdminId(adminId);
            })

            socket.on('sendKickFromRoomResponseUser', () => {
                history.push('/kicked');
            })
           
            socket.on('sendKickFromRoomResponseAdmin', () => {
                alert('User kicked!');
            })

            socket.on('sendRoomName', roomName => {
                dispatch(setRoomName(roomName));
            })
        }

        return () => {
            if (socket) {
                socket.off('sendRoomUsers');
                socket.off('sendRoomCurrentAdminId');
                socket.off('sendKickFromRoomResponseUser');
                socket.off('sendKickFromRoomResponseAdmin');
                socket.off('sendRoomName');

                dispatch(setRoomName(''));
            }
        }
    }, [socket, id, history, dispatch]);

    const SwitchVideoComponent = (type: string) => {
        switch(type) {
            case 'youtube':
                return <YoutubeVideo id={videoId} />
            case 'extlink':
                return <ExtLink>EXTERNAL LINK</ExtLink>
            default: return '';
        }
    }

    return (
        <Container>
            <Wrapper>            
                <VideoNav adminId={adminId} userId={authSelector.userId} videoLink={videoLink} onVideoTypeChange={handleVideoTypeChange} onVideoLinkChange={handleVideoLinkChange} />
                <VideoWrapper>
                    {SwitchVideoComponent(videoType)}
                    <Chat roomId={id} userId={authSelector.userId} adminId={adminId} activeUsers={activeUsers} />
                </VideoWrapper>
            </Wrapper>
        </Container>
    );
};

export default Room;