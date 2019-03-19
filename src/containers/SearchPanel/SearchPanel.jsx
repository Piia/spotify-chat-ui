import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from 'components/Spinner/Spinner';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import SearchResult from 'components/SearchResult/SearchResult';
import SearchBar from 'components/SearchBar/SearchBar';

import { searchTracks } from 'redux/search/search';
import { playTrack } from 'redux/playback/playback';

const Panel = styled.aside`
    flex-flow: column nowrap;
    background-color: ${props => props.theme.colors.goblin};
    padding: ${props => props.theme.spacing.md};
`;
Panel.displayName = 'Panel';

class SearchPanel extends PureComponent {
    render() {
        const { tracks, loading, error, playTrack, searchTracks } = this.props;

        if (loading) {
            return <Spinner />;
        }
        if (error && Object.keys(error).length > 0) {
            return <ErrorPage message={ error.message || error } />
        }

        return (
            <Panel>
                <SearchBar onSearch={ searchTracks } />
                <SearchResult tracks={ tracks } onPlay={ playTrack } />
            </Panel>
        );
    }
}

SearchPanel.propTypes = {
    tracks: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    searchTracks: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    tracks: state.search.tracks,
    loading: state.search.loading,
    error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
    searchTracks: trackName => dispatch(searchTracks(trackName)),
    playTrack: trackUri => dispatch(playTrack(trackUri)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SearchPanel);
