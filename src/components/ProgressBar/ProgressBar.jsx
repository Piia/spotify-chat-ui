import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';

const BarOutline = styled.div`
    border: 0.2em solid black;
    border-radius: 1.5em;
    height: 0.7em;
`;

const ProgressBarAnimation = keyframes`
    0%   {width: ${props => props.initialWidth}%;}
    100% {width: 100%;}
`;

const Bar = styled.div`
    border-radius: 1.5em;
    height: 100%;
    width: ${props => props.initialWidth}%;
    background-color: ${props => props.theme.colors.voodoo};
    animation: ${props => props.isPlaying && ProgressBarAnimation}
        ${props => props.animationTime}ms forwards;
    animation-timing-function: linear;
`;

const getPlaybackPercentage = playback => {
    const { timestamp, progressMillis, currentTrack } = playback;

    if (!currentTrack) {
        return 0;
    }

    const { durationMs } = currentTrack;
    const now = new Date().getTime();
    const relativeProgress = Math.min(
        1.0,
        (progressMillis + now - timestamp) / durationMs
    );
    return relativeProgress;
};

const getRemainingPlayBackTimeMillis = playback => {
    const { currentTrack } = playback;

    if (!currentTrack) {
        return 0;
    }

    const songDuration = currentTrack.durationMs;
    const playbackPercentage = getPlaybackPercentage(playback);
    return (1 - playbackPercentage) * songDuration;
};

const EMPTY_OBJECT = {};

const ProgressBar = () => {
    const playback = useSelector(
        state => state.playback.playback || EMPTY_OBJECT
    );

    const { initialWidth, animationTime } = React.useMemo(
        () => ({
            initialWidth: Math.round(100 * getPlaybackPercentage(playback)),
            animationTime: getRemainingPlayBackTimeMillis(playback),
        }),
        [playback]
    );

    return (
        <BarOutline>
            <Bar
                isPlaying={playback.isPlaying}
                key={playback.timestamp}
                initialWidth={initialWidth}
                animationTime={animationTime}
            />
        </BarOutline>
    );
};

export default ProgressBar;
