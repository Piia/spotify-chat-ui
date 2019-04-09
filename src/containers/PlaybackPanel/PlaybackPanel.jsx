import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { throttle } from 'lodash';

import PanelImage from 'components/PanelImage/PanelImage';
import PlayButton from 'components/PlayButton/PlayButton';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import TimerPanel from 'components/Timer/TimerPanel';
import { updatePlaybackState } from 'redux/playback/playback';


const Panel = styled.section`
    background-color: ${props => props.theme.colors.cosmic};
    position: relative;
    height: 130px;
    align-items: center;
    display: flex;
`;
Panel.displayName = 'Panel';

const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    padding: ${props => props.theme.spacing.sm};
`;
Wrapper.displayName = 'Wrapper';

const BarWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 60%;
    margin-left: 1em;
`;
BarWrapper.displayName = 'BarWrapper';

const Text = styled.div`
    display: flex;
    align-items: center;
    height: 2em;
    padding: 0 ${props => props.theme.spacing.sm};
`;
Text.displayName = 'Text';

const Name = styled.span`
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.bold};
    color: ${props => props.theme.colors.black};
`;
Name.displayName = 'Name';

const Album = styled.span`
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.bold};
    color: ${props => props.theme.colors.black};
`;
Album.displayName = 'Album';

class PlaybackPanel extends PureComponent {
    timerRef = null;

    updatePlaybackThrottled = throttle(this.props.updatePlaybackState, 200);

    componentDidUpdate(prevProps, prevState) {
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
        const { playback: { currentTrack, isPlaying, progressMillis } } = this.props;

        const albumUrl = currentTrack ? currentTrack.album.images[0].url : null;
        const trackDurationMillis = currentTrack ? currentTrack.durationMs : '';

        return (
            <Panel>
                <PanelImage url={ albumUrl } />
                <Wrapper>
                    <PlayButton />
                    <BarWrapper>
                        <Text>
                            <Name>{ currentTrack && currentTrack.name }</Name>
                            <Album>&nbsp;- { currentTrack && currentTrack.album.name }</Album>
                        </Text>
                        <ProgressBar />
                        <TimerPanel
                            isPlaying={ isPlaying }
                            progressMillis={ progressMillis }
                            trackDurationMillis={ trackDurationMillis }
                        />
                    </BarWrapper>
                </Wrapper>
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


export default connect(mapStateToProps, mapDispatchToProps)(PlaybackPanel);