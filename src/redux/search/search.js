import SpotifyClient from 'spotify_client/SpotifyClient';


const initialState = {
    tracks: [],
    loading: false,
}


const SEARCH_TRACKS = 'search/SEARCH_TRACKS';
const SEARCH_TRACKS_SUCCESS = 'search/SEARCH_TRACKS_SUCCESS';
const SEARCH_TRACKS_FAIL = 'search/SEARCH_TRACKS_FAIL';
export const searchTracks = () => {
    return async dispatch => {
        dispatch({
            type: SEARCH_TRACKS,
        });

        try {
            const result = await SpotifyClient.searchTracks();
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
    }),
    [SEARCH_TRACKS_FAIL]: ({
        ...state,
        loading: false,
    }),
})[action.type] || state;
