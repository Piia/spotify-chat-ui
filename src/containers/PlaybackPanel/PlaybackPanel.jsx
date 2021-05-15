import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import throttle from 'lodash/throttle';

import PanelImage from 'components/PanelImage/PanelImage';
import PlayButton from 'components/PlayButton/PlayButton';
import Playback from 'components/Playback/Playback';
import { updatePlaybackState } from 'store/playback/playback';

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

const PlaybackPanel = () => {
    const dispatch = useDispatch();
    const timerRef = React.useRef(null);

    const playback = useSelector(state => state.playback.playback);
    const { currentTrack, isPlaying, timestamp, progressMillis } = playback;
    const albumUrl = currentTrack ? currentTrack.album.images[0].url : null;

    const updatePlaybackThrottled = throttle(
        () => dispatch(updatePlaybackState()),
        200
    );

    React.useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef);
        }

        if (
            isPlaying &&
            currentTrack &&
            currentTrack.durationMs !== undefined
        ) {
            const trackShouldEnd =
                currentTrack.durationMs -
                (new Date().getTime() - timestamp + progressMillis);

            timerRef.current = setTimeout(
                updatePlaybackThrottled,
                trackShouldEnd
            );
        }
    }, [playback]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Panel>
            <PanelImage url={albumUrl} />
            <RowWrapper>
                <PlayButton />
                <Playback playback={playback} />
            </RowWrapper>
        </Panel>
    );
};

export default PlaybackPanel;
