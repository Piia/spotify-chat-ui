import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import PanelImage, { StyledImage } from 'components/PanelImage/PanelImage';
import PlayButton, { StyledPlayButton, StyledPauseButton } from 'components/PlayButton/PlayButton';
import ProgressBar from 'components/ProgressBar/ProgressBar';

import { updatePlaybackState } from 'redux/playback/playback';
import { throttle } from 'lodash';

const Panel = styled.section`
    background-color: ${props => props.theme.colors.cosmic};
    position: relative;
    height: 130px;
    align-items: center;
    display: flex;

    ${StyledImage} {
        margin-right: ${props => props.theme.spacing.xl};
    }

    ${StyledPlayButton},${StyledPauseButton} {
        margin-right: ${props => props.theme.spacing.sm};
    }
`;


class PlaybackPanel extends PureComponent {
    timerRef = null;

    updatePlaybackThrottled = throttle(this.props.updatePlaybackState, 200);

    componentDidUpdate(prevProps, prevState) {
        const { durationMillis, isPlaying, playbackStateUpdateTime, progressMillis } = this.props;
        if(this.timerRef) {
            clearTimeout(this.timerRef);
        }
        if(!isPlaying || durationMillis === null) {
            return;
        }
        const trackShouldEnd = 
            durationMillis - (new Date().getTime() - playbackStateUpdateTime + progressMillis);

        this.timerRef = setTimeout(this.updatePlaybackThrottled, trackShouldEnd);    
    }

    render() {
        return (
            <Panel>
                <PanelImage url={this.props.albumUrl} />
                <PlayButton />
                <ProgressBar />
            </Panel>
        );
    }
}


const mapStateToProps = state => ({
    albumUrl: state.playback.playback.currentTrack ?
        state.playback.playback.currentTrack.album.images[0].url : null,

    durationMillis: state.playback.playback.currentTrack ?
        state.playback.playback.currentTrack.durationMs :
        null,
    isPlaying: state.playback.playback.isPlaying,
    playbackStateUpdateTime: state.playback.playback.timestamp,
    progressMillis: state.playback.playback.progressMillis
});


const mapDispatchToProps = dispatch => ({
    updatePlaybackState: () => dispatch(updatePlaybackState())
});


export default connect(mapStateToProps, mapDispatchToProps)(PlaybackPanel);