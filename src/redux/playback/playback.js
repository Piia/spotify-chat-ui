import SpotifyClient from 'spotify_client/SpotifyClient';


const initialState = {
    currentTrack: null
};


const PLAY_TRACK = 'playback/PLAY_TRACK';
const PLAY_TRACK_SUCCESS = 'playback/PLAY_TRACK_SUCCESS';
const PLAY_TRACK_FAIL = 'playback/PLAY_TRACK_FAIL';


export const playTrack = trackUri => {
    return async dispatch => {
        dispatch({
            type: PLAY_TRACK,
        });

        if (!trackUri) {
            return dispatch({
                type: PLAY_TRACK_FAIL,
                error: { message: 'No trackUri' },
            });
        }

        try {
            await SpotifyClient.playTrack(trackUri);

            return dispatch({
                type: PLAY_TRACK_SUCCESS,
                trackUri: trackUri
            });

        } catch(error) {
            return dispatch({
                type: PLAY_TRACK_FAIL,
                error: error,
            });
        }
    };
};


export const playbackReducer = (state = initialState, action) => ({
    [PLAY_TRACK]: ({
        ...state,
    }),
    [PLAY_TRACK_SUCCESS]: ({
        ...state,
        currentTrack: action.trackUri,
    }),
    [PLAY_TRACK_FAIL]: ({
        ...state,
        error: action.error,
    }),
})[action.type] || state;