import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player'
import { BaseReactPlayerProps } from 'react-player/base'

import { useSocketContext } from '../../context/socketContext';

import VideoControls from '../molecules/VideoControls';

interface IYoutubeVideo {
    videoLink: string;
    roomId: string;
    videoType: string;
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const YoutubeVideo = ({videoLink, videoType, roomId}: IYoutubeVideo) => {
    const socket = useSocketContext();
    const ContainerRef = useRef<HTMLDivElement>(null);
    const PlayerRef = useRef(null);
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
    const [isProgressSliderTrigged, setIsProgressSliderTrigged] = useState(false);
    const [progressSliderSocketActive, setProgressSliderSocketActive] = useState(false);
    const [videoProgressForExtLink, setVideoProgressForExtLink] = useState(0);

    const handleOnReady = () => {
        if (ContainerRef && ContainerRef.current && videoDimensions.width === '0px' && videoDimensions.height === '0px') {
            setVideoDimensions({
                width: '100%',
                height: '100%'
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
        if (ContainerRef && ContainerRef.current) {
            if (!document.fullscreenElement) {
                ContainerRef.current.requestFullscreen().then(() => {
                }).catch(err => {
                    alert(`Error while attempting to enable fullscreen mode: ${err.message}`);
                })
            } else {
                document.exitFullscreen();
            }
        }
    }

    const handleProgress = (state: any) => {
        if (isProgressSliderTrigged === false && progressSliderSocketActive === false) {
            setVideoProgress(state.playedSeconds);
        }
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
            });

            socket.on('sendRoomVideoDuration', duration => {
                if (PlayerRef && PlayerRef.current) {
                    const currentPlayerRef = PlayerRef.current! as BaseReactPlayerProps;
                    
                    setVideoProgress(duration);
                    currentPlayerRef.seekTo(duration);
                    setProgressSliderSocketActive(false);
                    setIsProgressSliderTrigged(false);
                }
            });

            socket.on('sendGetCurrentProgressFromSocket', requester => {
                socket.emit('requestGiveRequesterCurrentProgress', {
                    requester: requester,
                    progress: videoProgress
                })
            });

            socket.on('sendCurrentProgressToRequester', progress => {
                if (PlayerRef && PlayerRef.current) {
                    const currentPlayerRef = PlayerRef.current! as BaseReactPlayerProps;
                    
                    setVideoProgress(progress);
                    setSocketPlayingStatus(true);
                    setVideoIsPlaying(true);
                    currentPlayerRef.seekTo(progress);
                    
                    if (videoType === 'extlink') {
                        setVideoProgressForExtLink(progress);
                    }
                }
            })
        }

        return () => {
            if (socket) {
                socket.off('sendRoomVideoStatus');
                socket.off('sendRoomVideoDuration');
                socket.off('sendGetCurrentProgressFromSocket');
                socket.off('sendCurrentProgressToRequester');
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
        } else {
            if (videoProgressForExtLink) {
                const currentPlayerRef = PlayerRef.current! as BaseReactPlayerProps;

                setTimeout(() => {
                    currentPlayerRef.seekTo(videoProgressForExtLink);
                }, 2000);
            }
        }
    }

    const handleOnProgressSliderBeforeChange = () => {
        setIsProgressSliderTrigged(true);
    }

    const handleOnProgressSliderAfterChange = (value: number) => {
        if (socket && isProgressSliderTrigged && progressSliderSocketActive === false) {
            setProgressSliderSocketActive(true);
            setVideoProgress(value);

            socket.emit('requestRoomChangeVideoDuration', roomId, value);
        }
    }

    const handleProgressSliderChange = (value: number) => {
        if (isProgressSliderTrigged && progressSliderSocketActive === false) {
            setVideoProgress(value);
        }
    }

    useEffect(() => {
        setVideoProgressForExtLink(0);
    }, [videoType])

    return (
        <Container ref={ContainerRef}>
            <ReactPlayer 
                ref={PlayerRef}
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
            <VideoControls muted={videoMuted} videoVolume={videoVolume} playing={videoIsPlaying} onProgressSliderChange={handleProgressSliderChange} onProgressSliderAfterChange={handleOnProgressSliderAfterChange} onProgressSliderBeforeChange={handleOnProgressSliderBeforeChange} videoProgress={videoProgress} videoLengthSeconds={videoLengthSeconds} onVolumeChange={handleVolumeChange} onPlayClick={handlePlayClick} onMuteClick={handleMuteClick} onFullScreenClick={handleFullScreenClick} />
        </Container>
    );
};

export default YoutubeVideo;