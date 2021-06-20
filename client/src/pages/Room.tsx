import React from 'react';
import styled from 'styled-components';

import VideoNav from '../components/molecules/VideoNav'
import YoutubeVideo from '../components/molecules/YoutubeVideo';
import Chat from '../components/organisms/Chat';

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 1600px;
    height: 100%;
    padding: 50px 0px;
    display: flex;
    flex-direction: column;
`

const VideoWrapper = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    margin-top: 30px;
    justify-content: space-between;
`

const Room = () => {
    return (
        <Container>
            <Wrapper>                
                <VideoNav />
                <VideoWrapper>
                    <YoutubeVideo />
                    <Chat />
                </VideoWrapper>
            </Wrapper>
        </Container>
    );
};

export default Room;