import React from 'react';
import styled from 'styled-components';

import RoomPeopleNumber from '../atoms/RoomPeopleNumber';
import Button from '../atoms/Button';

interface IRoomButton {
    name: string;
    id: string;
    number: string | number;
    [key: string]: any;
}

const Container = styled.div`
    width: 300px;
    height: 80px;
    background: ${({theme}) => theme.functional};
    display: flex;
`

const Details = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: flex-start;
    justify-content: space-between;
`

const Name = styled.span`
    color: ${({theme}) => theme.fontColorPrimary};
`

const ButtonWrapper = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const RoomButton = ({name, id, number, ...props}: IRoomButton) => {
    return (
        <Container {...props}>
            <Details>
                <Name>{name}</Name>
                <RoomPeopleNumber number={number}/>
            </Details>
            <ButtonWrapper>
                <Button to={`/room/${id}`}>join</Button>
            </ButtonWrapper>
        </Container>
    );
};

export default RoomButton;