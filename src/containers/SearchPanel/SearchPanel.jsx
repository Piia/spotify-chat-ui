import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from 'components/Spinner/Spinner';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import SearchResult from 'components/SearchResult/SearchResult';
import SearchBar from 'components/SearchBar/SearchBar';

import { searchTracks } from 'redux/search/search';


class SearchPanel extends PureComponent {

    handleSearch = trackName => this.props.searchTracks(trackName);

    render() {
        const { tracks, loading, error } = this.props;

        if (loading) {
            return <Spinner />;
        }
        if (error && Object.keys(error).length > 0) {
            return <ErrorPage message={ error.message || error } />
        }

        return (
            <Fragment>
                <SearchBar onSearch={ this.handleSearch } />
                <SearchResult tracks={ tracks } />
            </Fragment>
        );
    }
}

SearchPanel.propTypes = {
    tracks: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    tracks: state.search.tracks,
    loading: state.search.loading,
    error: state.search.error,
});

const mapDispatchToProps = dispatch => ({
    searchTracks: trackName => dispatch(searchTracks(trackName)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SearchPanel);
