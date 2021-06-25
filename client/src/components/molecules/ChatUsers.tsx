import React from 'react';
import styled from 'styled-components';

import { ActiveUsers } from '../../types/types';

interface IChatUsers {
    activeUsers: ActiveUsers[];
    adminId: string;
    userId: string;
    selectedUserId: string;
    handleUserClick: (userId: string) => void;
}

interface UserProps {
    isadmin: boolean;
    selected: boolean;
    isuseradmin: boolean;
}

const Container = styled.div`
    width: 100%;
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const List = styled.ul`
    list-style: none;
`

const Item = styled.li`
    text-align: center;
`;

const User = styled.button<UserProps>`
    font-size: 1.5em;
    color: ${({theme, isadmin}) => isadmin ? theme.red : theme.fontcolorSecondary};
    background: none;
    border: none;
    cursor: ${({isadmin, isuseradmin}) => isuseradmin ? (isadmin ? 'default' : 'pointer') : 'default'};
    outline: none;
    text-decoration: ${({selected}) => selected ? 'underline' : 'none'};
`

const ChatUsers = ({activeUsers, adminId, userId, selectedUserId, handleUserClick}: IChatUsers) => {

    return (
        <Container>
            {
                activeUsers.length !== 0 && adminId ? (
                    <List>
                        {
                            activeUsers.map((user) => {
                                const userRoomId = Object.keys(user)[0];
                                const userLogin = user[userRoomId];

                                return (
                                    <Item key={userRoomId}>
                                        <User onClick={() => userRoomId !== adminId && handleUserClick(userRoomId)} disabled={adminId !== userId} selected={selectedUserId === userRoomId} isuseradmin={adminId === userId} isadmin={adminId === userRoomId}>{userLogin}</User>
                                    </Item>
                                )
                            })
                        }
                    </List>
                ) : (
                    'loading'
                )
            }
        </Container>
    );
};

export default ChatUsers;