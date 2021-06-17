import React, { useState } from 'react';
import styled from 'styled-components';

import VideoLink from '../atoms/VideoLink';
import ButtonIcon from '../atoms/ButtonIcon';

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`

const StyledButtonIcon = styled(ButtonIcon)`
    &:first-of-type {
        margin-left: 15px;
    }
`

const StyledSettingsButtonIcon = styled(ButtonIcon)`
    margin-left: auto;
`

const VideoNav = () => {
    const [linkValue, setLinkValue] = useState('');
    const [videoTypeClicked, setVideoTypeClicked] = useState('youtube');

    const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLinkValue(e.target.value);
    }

    const handleVideoTypeClick = (type: string) => {
        setVideoTypeClicked(type);

        if (linkValue && window.confirm("You've set the video, continue anyway?")) {
            setLinkValue('');
        }
    }

    const handleSettingsClick = () => {

    }

    return (
        <Container>
            <VideoLink onChange={handleVideoLinkChange} value={linkValue}/>
            <StyledButtonIcon fontSize="2em" isLogoIcon={true} iconType="youtube-square" fontColor={videoTypeClicked === 'youtube' ? 'primary' : 'notSelected'} onClick={() => handleVideoTypeClick('youtube')} />
            <StyledButtonIcon fontSize="2em" iconType="external-link-square-alt" fontColor={videoTypeClicked === 'extlink' ? 'primary' : 'notSelected'} onClick={() => handleVideoTypeClick('extlink')} />
            <StyledSettingsButtonIcon fontSize="2em" iconType="cog" fontColor="primary" onClick={handleSettingsClick} />
        </Container>
    );
};

export default VideoNav;