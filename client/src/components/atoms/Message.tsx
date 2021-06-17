import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
    display: flex;
    font-size: 1.2em;
    margin: 5px 0px;
`

const Nick = styled.span`
    color: ${({theme}) => theme.fontcolorSecondary};
`

const UserMessage = styled.span`
    color: ${({theme}) => theme.fontColorPrimary};
    margin-left: 5px;
`

const Message = () => {
    return (
        <Container>
            <Nick>daniru0:</Nick>
            <UserMessage>siema</UserMessage>
        </Container>
    );
};

export default Message;