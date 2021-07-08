import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player'

import { useSocketContext } from '../../context/socketContext';

import VideoControls from '../molecules/VideoControls';

interface IYoutubeVideo {
    videoLink: string;
    roomId: string;
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const YoutubeVideo = ({videoLink, roomId}: IYoutubeVideo) => {
    const socket = useSocketContext();
    const ContainerRef = useRef<HTMLDivElement>(null);
    const [videoDimensions, setVideoDimensions] = useState({
        width: '0px',
        height: '0px',
    });
    const [videoIsPlaying, setVideoIsPlaying] = useState(false);
    const [socketPlayingStatus, setSocketPlayingStatus] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [videoLengthSeconds, setVideoLengthSeconds] = useState(0);
    const [videoVolume, setVideoVolume] = useState(0.50);
    const [videoMuted, setVideoMuted] = useState(false);

    const handleOnReady = () => {
        if (ContainerRef && ContainerRef.current && videoDimensions.width === '0px' && videoDimensions.height === '0px') {
            const containerRect = ContainerRef.current.getBoundingClientRect();
            
            setVideoDimensions({
                width: `${containerRect.width}px`,
                height: `${containerRect.height - 60}px` 
            })
        }
    }

    const handlePlayClick = () => {
        if (socket) {
            socket.emit('requestRoomVideoRun', roomId, !videoIsPlaying, videoProgress);
        }

    }

    const handleMuteClick = () => {
        setVideoMuted(prev => !prev);
    }

    const handleVolumeChange = (value: number) => {
        setVideoVolume(value);
    }

    const handleFullScreenClick = () => {

    }

    const handleProgress = (state: any) => {
        setVideoProgress(state.playedSeconds);
    }

    const handleDuration = (duration: number) => {
        setVideoLengthSeconds(duration);
    }

    useEffect(() => {
        if (socket) {
            socket.on('sendRoomVideoStatus', data => {
                setSocketPlayingStatus(data.playing);
                setVideoIsPlaying(data.playing);
                setVideoProgress(data.progress);
            })
        }

        return () => {
            if (socket) {
                socket.off('sendRoomVideoStatus');
            }
        }
    })

    const handlePause = () => {
        setVideoIsPlaying(false);
        if (socketPlayingStatus) {
            setVideoIsPlaying(true);
        }
    }

    const handlePlay = () => {
        setVideoIsPlaying(true);
        if (!socketPlayingStatus) {
            setVideoIsPlaying(false);
        }
    }

    return (
        <Container ref={ContainerRef}>
            <ReactPlayer 
                url={videoLink}
                controls={false}
                onReady={handleOnReady}
                width={videoDimensions.width}
                height={videoDimensions.height}
                playing={videoIsPlaying}
                volume={videoVolume}
                muted={videoMuted}
                onProgress={handleProgress}
                onDuration={handleDuration}
                onPause={handlePause}
                onPlay={handlePlay}
            />
            <VideoControls muted={videoMuted} videoVolume={videoVolume} playing={videoIsPlaying} videoProgress={videoProgress} videoLengthSeconds={videoLengthSeconds} onVolumeChange={handleVolumeChange} onPlayClick={handlePlayClick} onMuteClick={handleMuteClick} onFullScreenClick={handleFullScreenClick} />
        </Container>
    );
};

export default YoutubeVideo;