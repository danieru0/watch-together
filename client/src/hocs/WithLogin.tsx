import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useParams } from 'react-router-dom';

import { setRoomIdFromLink } from '../features/room/roomSlice';
import { selectAuth } from '../features/auth/authSlice';

import { useSocketContext } from '../context/socketContext';

const WithLogin = <P extends object>(Component: React.ComponentType<P>) => {
    return function Comp(props: P) {
        const socket = useSocketContext();
        const authSelector = useAppSelector(selectAuth);
        const dispatch = useAppDispatch();
        const { id } = useParams<{id: string}>();
        const [loginStatus, setLoginStatus] = useState<string | boolean>('loading');
    
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
            return <Component {...props}/>
        } else if (loginStatus === false || authSelector.login === '') {    
            if (id) {
                dispatch(setRoomIdFromLink(id));
                return <Redirect to="/login" />
            }
            
            return (
                <Redirect to="/" />
            )
        }

        return null;
    }
}

export default WithLogin;