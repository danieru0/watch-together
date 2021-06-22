import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

import { RoomDataListInterface } from '../types/types';

import { useSocketContext } from '../context/socketContext';

import { selectAuth } from '../features/auth/authSlice';

import Line from '../components/atoms/Line';
import RoomButton from '../components/molecules/RoomButton';

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 600px;
    margin-top: 200px;
`

const StyledLink = styled(Link)`
    width: 300px;
    height: 60px;
    background: ${({theme}) => theme.functional};
    color: ${({theme}) => theme.fontColorPrimary};
    text-transform: uppercase;
    text-decoration: none;
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    transition: background .2s;

    &:hover, &:focus {
        background: ${({theme}) => theme.functionalHover};
    }
`

const StyledLine = styled(Line)`
    margin: 60px 0px;
`

const StyledRoomButton = styled(RoomButton)`
    margin: 30px 0px;
    
    &:nth-of-type(1) {
        margin-top: 0;
    }

    &:nth-child(odd) {
        margin-right: 100px;
    }

    &:nth-child(even) {
        margin-left: 100px;
    }
`

const Text = styled.span`
    color: ${({theme}) => theme.fontColorPrimary};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.5em;
`

const Rooms = () => {
    const socket = useSocketContext();
    const authSelector = useAppSelector(selectAuth);
    const [rooms, setRooms] = useState<RoomDataListInterface>({});

    useEffect(() => {
        if (socket) {
            socket.emit('requestRoomsList');

            socket.on('sendRoomsListUpdate', roomData => {
                setRooms(roomData);
            });
        }

        return () => {socket && socket.off('sendRoomsListUpdate')}
    }, [socket]);

    return (
        <Container>
            <Wrapper>
                <StyledLink to={authSelector.login ? '/create' : '/login'}>{authSelector.login ? 'Create room' : 'Login'}</StyledLink>
                <StyledLine />
                {
                    Object.keys(rooms).length !== 0 ? (
                        Object.keys(rooms).map((roomId) => {
                            const room = rooms[roomId];

                            return (
                                <StyledRoomButton key={room.id} name={room.name} id={room.id} number={`${room.activeUsers}/${room.usersNumberMax}`} />
                            )
                        })
                    ) : (
                        <Text>No rooms</Text>
                    )
                }
            </Wrapper>
        </Container>
    );
};

export default Rooms;