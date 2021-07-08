import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import ButtonIcon from '../atoms/ButtonIcon';

interface IVideoControls {
    videoLengthSeconds: number;
    videoProgress: number;
    playing: boolean;
    videoVolume: number;
    muted: boolean;
    onMuteClick: () => void;
    onPlayClick: () => void;
    onFullScreenClick: () => void;
    onVolumeChange: (value: number) => void;
}

const Container = styled.div`
    width: 100%;
    height: 60px;
    background: ${({theme}) => theme.primaryHover};
    display: grid;
    grid-template-columns: 1fr auto 1fr;
`

const LeftControlsWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-left: 20px;
`

const ProgressBarWrapper = styled.div`
    display: flex;
    align-items: center;
`

const RightControlsWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-right: 20px;
`

const StyledSliderVolume = styled(Slider)`
    width: 120px;
    margin-left: 10px;

    .rc-slider-rail {
        background: ${({theme}) => theme.functional};
    }

    .rc-slider-handle {
        width: 15px;
        height: 15px;
        background: ${({theme}) => theme.primary};
        border: none;
    }
`

const StyledSliderProgress = styled(Slider)`
    width: 350px;
    margin-top: -6px;

    .rc-slider-rail {
        background: ${({theme}) => theme.functional};
        height: 10px;
    }

    .rc-slider-track {
        height: 10px;
    }

    .rc-slider-handle {
        width: 20px;
        height: 20px;
        background: ${({theme}) => theme.primary};
        border: none;
    }
`

const StyledButtonFullScreen = styled(ButtonIcon)`
    margin-left: auto;
`

const StyledVolumeButton = styled(ButtonIcon)`
    width: 24.3px;
    text-align: center;
`

const VideoControls = ({videoLengthSeconds, videoProgress, playing, videoVolume, muted, onPlayClick, onMuteClick, onFullScreenClick, onVolumeChange}: IVideoControls) => {
    const [isProgressSliderTrigged, setIsProgressSliderTrigged] = useState(false);
    const [progressSliderValue, setProgressSliderValue] = useState(0);
    
    const handleChange = (value: number) => {
        if (isProgressSliderTrigged) {
            setProgressSliderValue(value);
        }
    }

    const handleAfterChange = (value: number) => {
        setIsProgressSliderTrigged(false);
        setProgressSliderValue(value);
    }

    return (
        <Container>
            <LeftControlsWrapper>
                <ButtonIcon fontSize="1.2em" onClick={onPlayClick} iconType={playing ? 'pause' : 'play'} />
                <StyledVolumeButton fontSize="1.2em" onClick={onMuteClick} iconType={muted ? 'volume-mute' : 'volume-up'} />
                <StyledSliderVolume onChange={onVolumeChange} value={videoVolume} min={0} max={1} step={0.1} />
            </LeftControlsWrapper>
            <ProgressBarWrapper>
                <StyledSliderProgress onChange={handleChange} onAfterChange={handleAfterChange} onBeforeChange={() => setIsProgressSliderTrigged(true)} value={isProgressSliderTrigged ? progressSliderValue : videoProgress} min={0} max={videoLengthSeconds} step={1} />
            </ProgressBarWrapper>
            <RightControlsWrapper>
                <StyledButtonFullScreen fontSize="1.2em" onClick={onFullScreenClick} iconType="expand" />
            </RightControlsWrapper>
        </Container>
    );
};

export default VideoControls;