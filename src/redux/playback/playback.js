import SpotifyClient from 'spotify_client/SpotifyClient';


const initialState = {
    currentTrack: null
};


const PLAY_TRACK = 'playback/PLAY_TRACK';


export const playTrack = trackUri => {
    return dispatch => {
        return SpotifyClient.playTrack(trackUri).then(playbackResponse => {
            dispatch({
                type: PLAY_TRACK,
                trackUri: trackUri
            });
        });
    };
};


export const playbackReducer = (state = initialState, action) => ({
    [PLAY_TRACK]: ({
        ...state,
        currentTrack: action.trackUri,
    }),
})[action.type] || state;