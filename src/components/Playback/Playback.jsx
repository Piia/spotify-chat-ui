import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map } from 'lodash';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import TimerPanel from 'components/Timer/TimerPanel';

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 1em;
    width: calc(100% - 100px);
`;
Container.displayName = 'Container';

const BarWrapper = styled.div`
    width: 60%;
`;
BarWrapper.displayName = 'BarWrapper';

const Text = styled.div`
    display: flex;
    align-items: center;
    padding: 0 ${props => props.theme.spacing.sm};
`;
Text.displayName = 'Text';

const Name = styled.span`
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.bold};
    color: ${props => props.theme.colors.black};
    margin-left: ${props => props.theme.spacing.xs};
`;
Name.displayName = 'Name';

const Album = styled.span`
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.bold};
    color: ${props => props.theme.colors.black};
`;
Album.displayName = 'Album';

const Artist = styled.span`
    display: block;
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.black};
    padding: 0 ${props => props.theme.spacing.xs}
        ${props => props.theme.spacing.xs};
`;
Artist.displayName = 'Artist';

const Playback = props => {
    const {
        playback: { currentTrack, isPlaying, progressMillis },
    } = props;
    const trackDurationMillis = currentTrack ? currentTrack.durationMs : 0;

    return (
        <Container>
            <span>
                <Name>{currentTrack && currentTrack.name}</Name>
                <Album>&nbsp;- {currentTrack && currentTrack.album.name}</Album>
            </span>
            <Artist>
                {currentTrack && map(currentTrack.artists, 'name').join(', ')}
            </Artist>
            <BarWrapper>
                <ProgressBar />
                <TimerPanel
                    isPlaying={isPlaying}
                    progressMillis={progressMillis}
                    trackDurationMillis={trackDurationMillis}
                />
            </BarWrapper>
        </Container>
    );
};

Playback.propTypes = {
    playback: PropTypes.object.isRequired,
};

export default Playback;
