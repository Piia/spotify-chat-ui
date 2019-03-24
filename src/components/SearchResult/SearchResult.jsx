import React from 'react';
import PropTypes from 'prop-types';
import TrackList from 'components/TrackList/TrackList';
import TrackItem from 'components/TrackList/TrackItem';
import Spinner from 'components/Spinner/Spinner';
import ErrorPage from 'components/ErrorPage/ErrorPage';

const IMAGE_URL_INDEX = 2;

const SearchResult = ({ tracks, loading, onPlay, error }) => {
    if (loading) {
        return (
            <TrackList>
                <Spinner size={ 2 } style={{ margin: '2em auto' }} />
            </TrackList>
        );
    }
    if (error && Object.keys(error).length > 0) {
        console.log(error);
        return (
            <TrackList>
                <ErrorPage message={ error.message || error } />
            </TrackList>
        );
    }

    return (
        <TrackList>
            {tracks.map(track => {
                if (!track.album || !track.name) {
                    return null;
                }
                return (
                    <TrackItem 
                        key={ `${track.album.name}-${track.name }` } 
                        imageUrl={ track.album
                            && track.album.images
                            && track.album.images[IMAGE_URL_INDEX]
                            ? track.album.images[IMAGE_URL_INDEX].url
                            : null } 
                        title={ track.name } 
                        text={ track.album.name }
                        onPlay={ () => onPlay(track) }
                    />
                );
            })}
        </TrackList>
    );
};

SearchResult.defaultProps = {
    loading: false,
    error: {},
};

SearchResult.propTypes = {
    tracks: PropTypes.array.isRequired,
    onPlay: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.object,
};

export default SearchResult;
