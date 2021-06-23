import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectAuth } from '../features/auth/authSlice';
import { selectRoom, setPasswordAfterCreation, setRoomIdFromLink } from '../features/room/roomSlice';

import { useSocketContext } from '../context/socketContext';

import FormikPassword from '../components/molecules/FormikPassword';

const WithRoomAuth = <P extends object>(Component: React.ComponentType<P>) => {
    return function Comp(props: P) {
        const socket = useSocketContext();
        const { id } = useParams<{id: string}>();
        const authSelector = useAppSelector(selectAuth);
        const roomSelector = useAppSelector(selectRoom);
        const dispatch = useAppDispatch();
        const [passwordStatus, setPasswordStatus] = useState<string | boolean>('loading');
        const [passwordError, setPasswordError] = useState('');
        const [passwordFormSubmitted, setPasswordFormSubmitted] = useState(false);

        useEffect(() => {
            if (socket) {
                socket.emit('requestRoomPasswordExist', id);

                socket.on('sendRoomPasswordExist', data => {
                    if (data.passwordStatus) {
                        if (roomSelector.passwordAfterCreation) {
                            socket.emit('requestJoinRoom', id, roomSelector.passwordAfterCreation, authSelector.login);
                        } else {
                            setPasswordStatus(false);
                        }
                    } else {
                        socket.emit('requestJoinRoom', id, '', authSelector.login);
                    }
                });
                
                socket.on('sendJoinRoomStatus', data => {
                    if (data.status) {
                        setPasswordStatus(true);
                        setPasswordFormSubmitted(false);
                    } else {
                        setPasswordError('Wrong password!');
                        setPasswordFormSubmitted(false);
                    }
                })
            }

            return () => {
                if (socket) {
                    socket.off('sendRoomPasswordExist');
                    socket.off('sendJoinRoomStatus');
                    socket.emit('requestLeaveRoom', id);

                    if (roomSelector.passwordAfterCreation) {
                        dispatch(setPasswordAfterCreation(''));
                    }

                    if (roomSelector.roomIdFromLink) {
                        dispatch(setRoomIdFromLink(''));
                    }
                }
            }
        }, [socket, id, roomSelector.passwordAfterCreation, roomSelector.roomIdFromLink, authSelector.login, dispatch]);

        const handlePasswordFormiSubmit = (passwordValue: string) => {
            if (passwordFormSubmitted) return false;
            if (!socket) return false;
            setPasswordFormSubmitted(true);

            socket.emit('requestJoinRoom', id, passwordValue, authSelector.login);
        }

        if (passwordStatus === true) {
            return <Component {...props} />
        } else if (passwordStatus === false) {
            return <FormikPassword passwordError={passwordError} formSubmitted={passwordFormSubmitted} onSubmit={handlePasswordFormiSubmit} />
        }

        return null;
    }
}

export default WithRoomAuth;