import React, { useState } from 'react';
import styled from 'styled-components';
import urlParser, { YouTubeParseResult } from 'js-video-url-parser';

import VideoLink from '../atoms/VideoLink';
import ButtonIcon from '../atoms/ButtonIcon';

interface IVideoNav {
    onVideoLinkChange: (link: string, id: string) => void;
    onVideoTypeChange: (type: string) => void;
    videoLink: string;
    userId: string;
    adminId: string;
}

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

const NotLoggedLink = styled.span`
    display: block;
    padding: 8px 12px;
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.fontcolorSecondary};
    font-size: 1em;
    border: none;
    outline: none;
    text-align: center;
`

const VideoNav = ({onVideoLinkChange, onVideoTypeChange, videoLink, userId, adminId}: IVideoNav) => {
    const [videoTypeClicked, setVideoTypeClicked] = useState('youtube');

    const handleVideoLinkSubmit = (link: string) => {
        if (userId !== adminId) return false;

        if (videoTypeClicked !== 'extlink') {
            const videoInfo = urlParser.parse(link) as YouTubeParseResult;
            
            if (videoInfo && videoInfo.provider === videoTypeClicked) {
                onVideoLinkChange(link, videoInfo.id);
            }
        }
    }

    const handleVideoTypeClick = (type: string) => {
        setVideoTypeClicked(type);

        if (window.confirm("Are you sure?")) {
            onVideoLinkChange('', '');
            onVideoTypeChange(type);
        }
    }

    const handleSettingsClick = () => {

    }

    return (
        <Container>
            {
                adminId === userId ? (
                    <>
                        <VideoLink onSubmit={handleVideoLinkSubmit}/>
                        <StyledButtonIcon fontSize="2em" isLogoIcon={true} iconType="youtube-square" fontColor={videoTypeClicked === 'youtube' ? 'primary' : 'notSelected'} onClick={() => handleVideoTypeClick('youtube')} />
                        <StyledButtonIcon fontSize="2em" iconType="external-link-square-alt" fontColor={videoTypeClicked === 'extlink' ? 'primary' : 'notSelected'} onClick={() => handleVideoTypeClick('extlink')} />
                        <StyledSettingsButtonIcon fontSize="2em" iconType="cog" fontColor="primary" onClick={handleSettingsClick} />
                    </>
                ) : (
                    <NotLoggedLink>{videoLink ? videoLink : 'VIDEO IS NOT SET YET'}</NotLoggedLink>
                )
            }
        </Container>
    );
};

export default VideoNav;