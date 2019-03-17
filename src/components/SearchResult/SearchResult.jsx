import React from 'react';
import PropTypes from 'prop-types';
import TrackList from 'components/TrackList/TrackList';
import TrackItem from 'components/TrackList/TrackItem';

const IMAGE_URL_ORDER = 2;

const SearchResult = ({ tracks }) => {
    return (
        <TrackList>
            { tracks.map(track => {
                if (!track.album || !track.name) {
                    return null;
                }
                return (
                    <TrackItem 
                        key={ `${track.album.name}-${track.name }` } 
                        imageUrl={ track.album
                            && track.album.images
                            && track.album.images[IMAGE_URL_ORDER]
                            ? track.album.images[IMAGE_URL_ORDER].url
                            : null } 
                        title={ track.name } 
                        text={ track.album.name }
                    />
                );
            }) }
        </TrackList>
    );
};

SearchResult.propTypes = {
    tracks: PropTypes.array.isRequired,
};

export default SearchResult;
