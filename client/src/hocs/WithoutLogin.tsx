import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

import { selectRoom } from '../features/room/roomSlice';
import { selectAuth } from '../features/auth/authSlice';

import { useSocketContext } from '../context/socketContext';

const WithoutLogin = <P extends object>(Component: React.ComponentType<P>) => {
    return function Comp(props: P) {
        const [loginStatus, setLoginStatus] = useState<string | boolean>('loading')
        const socket = useSocketContext();
        const authSelector = useAppSelector(selectAuth);
        const roomSelector = useAppSelector(selectRoom);

        useEffect(() => {
            if (socket && authSelector.login !== '') {
                socket.emit('requestCheckLogin');

                socket.on('sendLoginStatus', data => {
                    setLoginStatus(data);
                })
            }

            return () => {socket && socket.off('sendLoginStatus')}
        }, [socket, authSelector.login]);

        if (loginStatus === true) {
            return roomSelector.roomIdFromLink 
                ? <Redirect to={`/room/${roomSelector.roomIdFromLink}`} />
                : <Redirect to="/" />
        } else if (loginStatus === false || authSelector.login === '') {            
            return (
                <Component {...props}/>
            )
        }

        return null;
    }
}

export default WithoutLogin;