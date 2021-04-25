import SpotifyClient from 'spotify_client/SpotifyClient';


const initialState = {
    playback: {
        currentTrack: null,
        timestamp: new Date().getTime(),
        isPlaying: false,
        progressMillis: 0
    }
};


const PLAY_TRACK = 'playback/PLAY_TRACK';
const PLAY_TRACK_SUCCESS = 'playback/PLAY_TRACK_SUCCESS';
const PLAY_TRACK_FAIL = 'playback/PLAY_TRACK_FAIL';
const UPDATE_PLAYBACK_STATE_SUCCESS = 'playback/SET_PLAYBACK_STATE_SUCCESS';
const UPDATE_PLAYBACK_STATE_FAIL = 'playback/SET_PLAYBACK_STATE_FAIL';
const PAUSE_TRACK = 'playback/PAUSE_TRACK';
const RESUME_TRACK = 'playback/RESUME_TRACK';
const TOGGLE_PLAYBACK_FAIL = 'playback/TOGGLE_PLAYBACK_FAILED';

export const updatePlaybackState = () => {
    return dispatch => {
        SpotifyClient.getPlaybackState().then(playbackStateResponse => {
            dispatch({
                type: UPDATE_PLAYBACK_STATE_SUCCESS,
                playbackState: playbackStateResponse.data
            });
        })
            .catch(errorResponse => {
                dispatch({
                    type: UPDATE_PLAYBACK_STATE_FAIL,
                    error: { message: 'Failed to get current playback state'}
                });
            });
    };
}


export const playTrack = track => {
    return async dispatch => {
        dispatch({
            type: PLAY_TRACK,
        });

        const trackUri = track.uri;

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
                track: track
            });

        } catch(error) {
            return dispatch({
                type: PLAY_TRACK_FAIL,
                error: error,
            });
        }
    };
};


export const pause = () => {
    return (dispatch, getState) => {
        SpotifyClient.pausePlayback().then(() => {
            const { progressMillis, timestamp } = getState().playback.playback;
            const progressNow = progressMillis + new Date().getTime() - timestamp;
            dispatch({ type: PAUSE_TRACK, progressMillis: progressNow });
        })
            .catch(errorResponse => {
                dispatch({
                    type: TOGGLE_PLAYBACK_FAIL,
                    error: { message: 'Failed to pause track'}
                });
            });
    };
}

export const resume = () => {
    return dispatch => {
        SpotifyClient.resumePlayback().then(() => {
            dispatch({ type: RESUME_TRACK });
        })
            .catch(errorResponse => {
                dispatch({
                    type: TOGGLE_PLAYBACK_FAIL,
                    error: { message: 'Failed to resume track'}
                });
            });
    };
}



export const playbackReducer = (state = initialState, action) => ({
    [PLAY_TRACK]: ({
        ...state,
    }),
    [PLAY_TRACK_SUCCESS]: ({
        ...state,
        playback: {
            currentTrack: action.track,
            progressMillis: 0,
            isPlaying: true,
            timestamp: new Date().getTime(),
        }
    }),
    [PLAY_TRACK_FAIL]: ({
        ...state,
        error: action.error        
    }),
    [UPDATE_PLAYBACK_STATE_SUCCESS]: ({
        ...state, 
        playback: action.playbackState && {
            currentTrack: action.playbackState.item,
            progressMillis: action.playbackState.progress_ms,
            isPlaying: action.playbackState.is_playing,
            timestamp: new Date().getTime()
        }
    }),
    [UPDATE_PLAYBACK_STATE_FAIL]: ({
        ...state, 
        error: action.error
    }),
    [PAUSE_TRACK]: ({
        ...state, 
        playback: {
            ...state.playback,
            isPlaying: false,
            progressMillis: action.progressMillis,
            timestamp: new Date().getTime(),
        }
    }),
    [RESUME_TRACK]: ({
        ...state, 
        playback: {
            ...state.playback,
            isPlaying: true,
            timestamp: new Date().getTime(),
        }
    }),
    [TOGGLE_PLAYBACK_FAIL]: ({
        ...state, 
        error: action.error
    })
})[action.type] || state;