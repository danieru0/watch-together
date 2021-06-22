import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { selectRoom, setPasswordAfterCreation } from '../features/room/roomSlice';

import { useSocketContext } from '../context/socketContext';

const WithRoomAuth = <P extends object>(Component: React.ComponentType<P>) => {
    return function Comp(props: P) {
        const socket = useSocketContext();
        const { id } = useParams<{id: string}>();
        const roomSelector = useAppSelector(selectRoom);
        const dispatch = useAppDispatch();
        const [passwordStatus, setPasswordStatus] = useState<string | boolean>('loading');
        const [passwordError, setPasswordError] = useState('');

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
                    } else {
                        setPasswordError('Wrong password1');
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
                }
            }
        }, [socket, id, roomSelector.passwordAfterCreation, dispatch]);

        if (passwordStatus === true) {
            return <Component {...props} />
        } else if (passwordStatus === false) {
            return <p>hasło formularz tutaj</p>
        }

        return null;
    }
}

export default WithRoomAuth;