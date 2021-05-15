import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import SearchResult from 'components/SearchResult/SearchResult';
import SearchBar from 'components/SearchBar/SearchBar';

import { searchTracks } from 'store/search/search';
import { playTrack } from 'store/playback/playback';

const Panel = styled.aside`
    flex-flow: column nowrap;
    background-color: ${props => props.theme.colors.voodoo};
`;
Panel.displayName = 'Panel';

const SearchPanel = () => {
    const dispatch = useDispatch();

    const tracks = useSelector(state => state.search.tracks);
    const loading = useSelector(state => state.search.loading);
    const error = useSelector(state => state.search.error);

    const handleSearch = React.useCallback(
        trackName => dispatch(searchTracks(trackName)),
        [dispatch]
    );

    const handlePlayTrack = React.useCallback(
        track => dispatch(playTrack(track)),
        [dispatch]
    );

    return (
        <Panel>
            <SearchBar onSearch={handleSearch} />
            <SearchResult
                tracks={tracks}
                onPlay={handlePlayTrack}
                loading={loading}
                error={error}
            />
        </Panel>
    );
};

export default SearchPanel;
