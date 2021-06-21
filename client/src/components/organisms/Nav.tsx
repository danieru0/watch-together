import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

import { selectAuth } from '../../features/auth/authSlice';

import ButtonIcon from '../atoms/ButtonIcon';

interface LogoProps {
    islogged: string | undefined;
}

const Container = styled.div`
    width: 100%;
    height: 60px;
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.fontColorPrimary};
    padding: 0px 20px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    position: sticky;
    top: 0;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`

const Logo = styled(Link)<LogoProps>`
    text-transform: ${({islogged}) => islogged ? 'normal' : 'uppercase'};
    text-decoration: none;
    font-weight: 400;
    font-size: 1.3em;
    color: ${({theme}) => theme.fontColorPrimary};
    margin-right: auto;
`

const RoomName = styled.span`
    font-size: 1.3em;
`

const StyledButtonIcon = styled(ButtonIcon)`
    font-size: 1.3em;
    margin-left: auto;
`

const Nav = () => {
    const authSelector = useAppSelector(selectAuth);

    const isInRoom = false;

    const handleLogOutclick = () => {
        alert('logout')
    }

    return (
        <Container>
            <Wrapper>
                <Logo islogged={authSelector.login ? 'true' : undefined} to="/">
                    { authSelector.login ? authSelector.login : 'watch together' }
                </Logo>
            </Wrapper>
            <Wrapper>
                { isInRoom && <RoomName>plplplpl</RoomName> }
            </Wrapper>
            <Wrapper>
                <StyledButtonIcon onClick={handleLogOutclick} iconType="sign-out-alt"  />
            </Wrapper>
        </Container>
    );
};

export default Nav;