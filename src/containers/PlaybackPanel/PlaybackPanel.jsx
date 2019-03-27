import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import PanelImage from 'components/PanelImage/PanelImage';
import PlayButton from 'components/PlayButton/PlayButton';
import ProgressBar from 'components/ProgressBar/ProgressBar';

const Panel = styled.section`
    background-color: ${props => props.theme.colors.cosmic};
    position: relative;
    height: 130px;
    align-items: center;
    display: flex;

    img {
        margin-right: 2em;
    }

    button {
        margin-right: 0.5em;
    }
`;


class PlaybackPanel extends PureComponent {
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
        state.playback.playback.currentTrack.album.images[0].url : null
});

export default connect(mapStateToProps)(PlaybackPanel);