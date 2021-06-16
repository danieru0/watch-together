import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IRoomPeopleNumber {
    number: string | number;
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledIcon = styled(FontAwesomeIcon)`
    color: ${({theme}) => theme.primary};
    font-size: 0.9em;
`

const Counter = styled.span`
    color: ${({theme}) => theme.fontColorPrimary};
    margin-left: 5px;
`

const RoomPeopleNumber = ({number}: IRoomPeopleNumber) => {
    return (
        <Container>
            <StyledIcon icon="user" />
            <Counter>{number}</Counter>
        </Container>
    );
};

export default RoomPeopleNumber;