import React, { useState } from 'react';
import styled from 'styled-components';

interface UserProps {
    isadmin: boolean;
    selected: boolean;
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

const Item = styled.li``;

const User = styled.button<UserProps>`
    font-size: 1.5em;
    color: ${({theme, isadmin}) => isadmin ? theme.red : theme.fontcolorSecondary};
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    text-decoration: ${({selected}) => selected ? 'underline' : 'none'};
`

const ChatUsers = () => {
    const [selectedUserId, setSelectedUserId] = useState('1');

    const handleUserClick = (id: string) => {
        setSelectedUserId(id);
    }

    return (
        <Container>
            <List>
                <Item>
                    <User selected={selectedUserId === '0'} isadmin={true}>daniru0</User>
                </Item>
                <Item>
                    <User onClick={() => handleUserClick('1')} selected={selectedUserId === '1'} isadmin={false}>daniru0</User>
                </Item>
            </List>
        </Container>
    );
};

export default ChatUsers;