import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import PanelImage from 'components/PanelImage/PanelImage';

const Panel = styled.section`
    background-color: ${props => props.theme.colors.cosmic};
    position: relative;
    height: 130px;
    align-items: center;
    display: flex;

    img {
        margin-right: 1em;
    }
`;


class PlaybackPanel extends PureComponent {
    render() {
        return (
            <Panel>
                <PanelImage url={this.props.albumUrl} />
                <button>Play/Pause</button>
            </Panel>
        );
    }
}


const mapStateToProps = state => ({
    albumUrl: state.playback.playback.currentTrack ?
        state.playback.playback.currentTrack.album.images[0].url : null
});

export default connect(mapStateToProps)(PlaybackPanel);