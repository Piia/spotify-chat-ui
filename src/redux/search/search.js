import SpotifyClient from 'spotify_client/SpotifyClient';


const initialState = {
    tracks: [],
    loading: false,
    error: {}
}


const SEARCH_TRACKS = 'search/SEARCH_TRACKS';
const SEARCH_TRACKS_SUCCESS = 'search/SEARCH_TRACKS_SUCCESS';
const SEARCH_TRACKS_FAIL = 'search/SEARCH_TRACKS_FAIL';
export const searchTracks = trackName => {
    return async dispatch => {
        dispatch({
            type: SEARCH_TRACKS,
        });

        if (!trackName) {
            return dispatch({
                type: SEARCH_TRACKS_FAIL,
                error: { message: 'No trackName' },
            });
        }

        try {
            const result = await SpotifyClient.searchTracks(trackName);
            return dispatch({
                type: SEARCH_TRACKS_SUCCESS,
                result: result.data,
            });
        } catch(error) {
            return dispatch({
                type: SEARCH_TRACKS_FAIL,
                error: error,
            });
        }
    };
}

export const searchReducer = (state = initialState, action) => ({
    [SEARCH_TRACKS]: ({
        ...state,
        loading: true,
    }),
    [SEARCH_TRACKS_SUCCESS]: ({
        ...state,
        tracks: action.result,
        loading: false,
        error: {},
    }),
    [SEARCH_TRACKS_FAIL]: ({
        ...state,
        loading: false,
        error: action.error,
    }),
})[action.type] || state;
