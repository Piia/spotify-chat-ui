import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';


const BarOutline = styled.div`
    border: 0.2em solid black;
    border-radius: 1.5em; 
    height: 0.7em;
    width: 60%;
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
    animation: ${ProgressBarAnimation} ${props => props.animationTime}ms forwards;
    animation-timing-function: linear;
`;


class ProgressBar extends PureComponent {
    state = {
        initialWidth: 0
    }
    
    componentDidMount() {
        this.setState({
            initialWidth: Math.round(100 * this.getPlaybackPercentage()),
            animationTime: this.getRemainingPlayBackTimeMillis()
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.playback !== this.props.playback) {
            this.setState({
                initialWidth: Math.round(100 * this.getPlaybackPercentage()),
                animationTime: this.getRemainingPlayBackTimeMillis()
            });
        }
    }

    getPlaybackPercentage() {
        const { playback: { timestamp, progressMillis, currentTrack } } = this.props;

        if(!currentTrack) {
            return 0;
        }

        const { durationMs } = currentTrack;
        const now = new Date().getTime();
        const relativeProgress = Math.min(1.0, (progressMillis + now - timestamp) / durationMs);
        return relativeProgress;
    }

    getRemainingPlayBackTimeMillis() {
        const currentTrack = this.props.playback.currentTrack;

        if(!currentTrack) {
            return 0;
        }
        
        const songDuration = currentTrack.durationMs;
        const playbackPercentage = this.getPlaybackPercentage();
        return (1 - playbackPercentage) * songDuration;
    }

    render() {
        return (
            <BarOutline>
                <Bar key={this.props.playback.timestamp} initialWidth={this.state.initialWidth} animationTime={this.state.animationTime} />
            </BarOutline>
        );
    }
}

const mapStateToProps = state => ({
    playback: state.playback.playback
});

export default connect(mapStateToProps)(ProgressBar);