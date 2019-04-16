import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { throttle } from 'lodash';

import PanelImage from 'components/PanelImage/PanelImage';
import PlayButton from 'components/PlayButton/PlayButton';
import Playback from 'components/Playback/Playback';
import { updatePlaybackState } from 'redux/playback/playback';


const Panel = styled.section`
    background-color: ${props => props.theme.colors.cosmic};
    position: relative;
    height: 130px;
    align-items: center;
    display: flex;
    border-left: 1px solid ${props => props.theme.colors.black};
`;
Panel.displayName = 'Panel';

const RowWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    padding: ${props => props.theme.spacing.sm};
`;
RowWrapper.displayName = 'RowWrapper';


class PlaybackPanel extends PureComponent {
    timerRef = null;

    updatePlaybackThrottled = throttle(this.props.updatePlaybackState, 200);

    componentDidUpdate() {
        const { playback: { currentTrack, isPlaying, timestamp, progressMillis } } = this.props;
        if (this.timerRef) {
            clearTimeout(this.timerRef);
        }
        if (!isPlaying || !currentTrack || currentTrack.durationMs === undefined) {
            return;
        }
        const trackShouldEnd = 
            currentTrack.durationMs - (new Date().getTime() - timestamp + progressMillis);

        this.timerRef = setTimeout(this.updatePlaybackThrottled, trackShouldEnd);    
    }

    render() {
        const { playback: { currentTrack }, playback } = this.props;

        const albumUrl = currentTrack ? currentTrack.album.images[0].url : null;

        return (
            <Panel>
                <PanelImage url={ albumUrl } />
                <RowWrapper>
                    <PlayButton />
                    <Playback playback={ playback } />
                </RowWrapper>
            </Panel>
        );
    }
}

PlaybackPanel.propTypes = {
    playback: PropTypes.object.isRequired,
    updatePlaybackState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    playback: state.playback.playback
});
const mapDispatchToProps = dispatch => ({
    updatePlaybackState: () => dispatch(updatePlaybackState())
});
const connected = connect(mapStateToProps, mapDispatchToProps);

export default connected(PlaybackPanel);