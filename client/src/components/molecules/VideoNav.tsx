import React, { useState } from 'react';
import styled from 'styled-components';
import urlParser, { YouTubeParseResult } from 'js-video-url-parser';

import VideoLink from '../atoms/VideoLink';
import ButtonIcon from '../atoms/ButtonIcon';

interface IVideoNav {
    onVideoLinkChange: (link: string, id: string) => void;
    onVideoTypeChange: (type: string) => void;
    onSettingsClick: () => void;
    onMobileChatClick: () => void;
    videoLink: string;
    userId: string;
    adminId: string;
}

const ContainerAdmin = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    @media (max-width: 560px) {
        flex-direction: column;
    }
`

const ContainerNormal = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`

const ButtonsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media (max-width: 560px) {
        justify-content: space-around;
        margin-top: 10px;
    }
`

const LeftButtonsWrapper = styled.div`
    margin-left: 15px;
    display: flex;

    @media (max-width: 560px) {
        margin: 0;
    }
`

const RightButtonsWrapper = styled.div`
    display: flex;

    @media (max-width: 560px) {
        margin-left: 0;
    }
`

const MobileChatButton = styled(ButtonIcon)`
    display: none;

    @media (max-width: 1000px) {
        display: block;
    }
`

const StyledMobileChatButton = styled(MobileChatButton)`
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

const VideoNav = ({onVideoLinkChange, onVideoTypeChange, onSettingsClick, onMobileChatClick, videoLink, userId, adminId}: IVideoNav) => {
    const [videoTypeClicked, setVideoTypeClicked] = useState('youtube');

    const handleVideoLinkSubmit = (link: string) => {
        if (userId !== adminId) return false;

        if (videoTypeClicked !== 'extlink') {
            const videoInfo = urlParser.parse(link) as YouTubeParseResult;
            
            if (videoInfo && videoInfo.provider === videoTypeClicked) {
                onVideoLinkChange(link, videoInfo.id);
            }
        } else {
            const videoInfo = urlParser.parse(link);

            if (videoInfo === undefined) {
                onVideoLinkChange(link, 'id');
            }
        }
    }

    const handleVideoTypeClick = (type: string) => {
        if (window.confirm("Are you sure?")) {
            setVideoTypeClicked(type);
            onVideoLinkChange('', '');
            onVideoTypeChange(type);
        }
    }

    if (adminId === userId) {
        return (
            <ContainerAdmin>
                <VideoLink onSubmit={handleVideoLinkSubmit}/>
                <ButtonsWrapper>
                    <LeftButtonsWrapper>
                        <ButtonIcon fontSize="2em" isLogoIcon={true} iconType="youtube-square" fontColor={videoTypeClicked === 'youtube' ? 'primary' : 'notSelected'} onClick={() => handleVideoTypeClick('youtube')} />
                        <ButtonIcon fontSize="2em" iconType="external-link-square-alt" fontColor={videoTypeClicked === 'extlink' ? 'primary' : 'notSelected'} onClick={() => handleVideoTypeClick('extlink')} />
                    </LeftButtonsWrapper>
                    <RightButtonsWrapper>
                        <ButtonIcon fontSize="2em" iconType="cog" fontColor="primary" onClick={onSettingsClick} />
                        <MobileChatButton fontSize="2em" iconType="comments" fontColor="primary" onClick={onMobileChatClick} />
                    </RightButtonsWrapper>
                </ButtonsWrapper>
            </ContainerAdmin>
        )
    }

    return (
        <ContainerNormal>
            <NotLoggedLink>{videoLink ? videoLink : 'VIDEO IS NOT SET YET'}</NotLoggedLink>
            <StyledMobileChatButton fontSize="2em" iconType="comments" fontColor="primary" onClick={onMobileChatClick} />
        </ContainerNormal>
    )
};

export default VideoNav;