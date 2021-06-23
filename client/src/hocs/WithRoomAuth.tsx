import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectRoom, setPasswordAfterCreation, setRoomIdFromLink } from '../features/room/roomSlice';

import { useSocketContext } from '../context/socketContext';

import FormikPassword from '../components/molecules/FormikPassword';

const WithRoomAuth = <P extends object>(Component: React.ComponentType<P>) => {
    return function Comp(props: P) {
        const socket = useSocketContext();
        const { id } = useParams<{id: string}>();
        const roomSelector = useAppSelector(selectRoom);
        const dispatch = useAppDispatch();
        const [passwordStatus, setPasswordStatus] = useState<string | boolean>('loading');
        const [passwordError, setPasswordError] = useState('');
        const [passwordValue, setPasswordValue] = useState('');
        const [passwordFormSubmitted, setPasswordFormSubmitted] = useState(false);

        useEffect(() => {
            if (socket) {
                socket.emit('requestRoomPasswordExist', id);

                socket.on('sendRoomPasswordExist', data => {
                    if (data.passwordStatus) {
                        if (roomSelector.passwordAfterCreation) {
                            socket.emit('requestJoinRoom', id, roomSelector.passwordAfterCreation);
                        } else {
                            setPasswordStatus(false);
                        }
                    } else {
                        setPasswordStatus(true);
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

                    if (roomSelector.passwordAfterCreation) {
                        dispatch(setPasswordAfterCreation(''));
                    }

                    if (roomSelector.roomIdFromLink) {
                        dispatch(setRoomIdFromLink(''));
                    }
                }
            }
        }, [socket, id, roomSelector.passwordAfterCreation, roomSelector.roomIdFromLink, dispatch]);

        const handlePasswordFormiSubmit = (passwordValue: string) => {
            if (passwordFormSubmitted) return false;
            if (!socket) return false;
            setPasswordFormSubmitted(true);

            socket.emit('requestJoinRoom', id, passwordValue);
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