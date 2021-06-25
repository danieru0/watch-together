import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StyledIcon = styled(FontAwesomeIcon)`
    color: ${({theme}) => theme.primary};
    font-size: 10em;
    margin-bottom: 50px;
`

const Text = styled.span`
    color:  ${({theme}) => theme.fontColorPrimary};
    font-size: 1.5em;
    font-weight: 300;
    user-select: none;
`

const Kicked = () => {
    return (
        <Container>
            <StyledIcon spin icon={['fab', 'sticker-mule']} />
            <Text>You have been kicked from the room!</Text>
        </Container>
    );
};

export default Kicked;