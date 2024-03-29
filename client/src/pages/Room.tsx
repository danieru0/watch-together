import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectAuth } from '../features/auth/authSlice';
import { setRoomName, setBasicRoomData } from '../features/room/roomSlice';
import { setModalActive } from '../features/modal/modalSlice';

import { useSocketContext } from '../context/socketContext';

import { ActiveUsers } from '../types/types';

import VideoNav from '../components/molecules/VideoNav'
import Chat from '../components/organisms/Chat';
import Video from '../components/organisms/Video';

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

    @media (max-width: 1635px) {
        width: 98%;
    }
`

const RoomContent = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    margin-top: 30px;
    justify-content: space-between;
    position: relative;
    overflow-x: hidden;
`

const VideoWrapper = styled.div`
    width: 60%;
    height: 100%;
    background: ${({theme}) => theme.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 1000px) {
        width: 100%;
    }
`

const NoVideoText = styled.span`
    color: ${({theme}) => theme.fontcolorSecondary};
    text-transform: uppercase;
    letter-spacing: 1px;
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
    const [videoType, setVideoType] = useState('youtube');
    const [mobileChatActive, setMobileChatActive] = useState(false);

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

    const handleSettingsClick = () => {
        dispatch(setModalActive({
            active: true,
            type: 'settings',
            id: id
        }));
    }

    const handleMobileChatClick = () => {
        setMobileChatActive(prev => !prev);
    }

    useEffect(() => {
        if (socket) {
            socket.on('sendRoomVideoUrl', link => {
                setVideoLink(link);
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

            socket.on('sendRoomName', roomName => {
                dispatch(setRoomName(roomName));
            })

            socket.on('sendBasicRoomData', data => {
                dispatch(setBasicRoomData(data));
            })

            socket.on('sendPlayingStatusToClient', playing => {
                if (playing) {
                    socket.emit('requestCurrentProgressFromActiveSocket', id);
                }
            })
        }

        return () => {
            if (socket) {
                socket.off('sendRoomUsers');
                socket.off('sendRoomCurrentAdminId');
                socket.off('sendKickFromRoomResponseUser');
                socket.off('sendKickFromRoomResponseAdmin');
                socket.off('sendRoomName');
                socket.off('sendPlayingStatusToClient');
                socket.off('sendBasicRoomData');

                dispatch(setRoomName(''));
            }
        }
    }, [socket, id, history, dispatch]);

    return (
        <Container>
            <Wrapper>            
                <VideoNav adminId={adminId} userId={authSelector.userId} videoLink={videoLink} onMobileChatClick={handleMobileChatClick} onSettingsClick={handleSettingsClick} onVideoTypeChange={handleVideoTypeChange} onVideoLinkChange={handleVideoLinkChange} />
                <RoomContent>
                    <VideoWrapper>
                        {videoLink ? <Video videoType={videoType} roomId={id} videoLink={videoLink} /> : <NoVideoText>The video hasn't been set yet</NoVideoText>}
                    </VideoWrapper>
                    <Chat roomId={id} mobileChatActive={mobileChatActive} userId={authSelector.userId} adminId={adminId} activeUsers={activeUsers} />
                </RoomContent>
            </Wrapper>
        </Container>
    );
};

export default Room;