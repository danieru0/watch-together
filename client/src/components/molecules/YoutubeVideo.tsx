import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 60%;
    height: 100%;
    background: ${({theme}) => theme.primary};
    display: flex;
    align-items: center;
    justify-content: center;
`

const NoVideoText = styled.span`
    color: ${({theme}) => theme.fontcolorSecondary};
    text-transform: uppercase;
    letter-spacing: 1px;
`

const YoutubeVideo = () => {
    return (
        <Container>
            <NoVideoText>The video hasn't been set yet</NoVideoText>
        </Container>
    );
};

export default YoutubeVideo;