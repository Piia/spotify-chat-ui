import { Dispatch } from 'react';
import SpotifyClient from 'spotify_client/SpotifyClient';
import { RootState } from 'store';
import { Track } from 'store/spotify.types';

enum PlaybackActionTypes {
    PLAY_TRACK_SUCCESS = 'playback/PLAY_TRACK_SUCCESS',
    PLAY_TRACK_FAIL = 'playback/PLAY_TRACK_FAIL',
    UPDATE_PLAYBACK_STATE_SUCCESS = 'playback/SET_PLAYBACK_STATE_SUCCESS',
    UPDATE_PLAYBACK_STATE_FAIL = 'playback/SET_PLAYBACK_STATE_FAIL',
    PAUSE_TRACK = 'playback/PAUSE_TRACK',
    RESUME_TRACK = 'playback/RESUME_TRACK',
    TOGGLE_PLAYBACK_FAIL = 'playback/TOGGLE_PLAYBACK_FAILED',
}

type PlaybackError = {
    message: string;
};

type UpdatePlaybackStateSuccessAction = {
    type: PlaybackActionTypes.UPDATE_PLAYBACK_STATE_SUCCESS;
    playbackResponse: {
        item: Track;
        progress_ms: number;
        is_playing: boolean;
    };
};

type UpdatePlaybackStateFailureAction = {
    type: PlaybackActionTypes.UPDATE_PLAYBACK_STATE_FAIL;
    error: PlaybackError;
};

type PlayTrackSuccessAction = {
    type: PlaybackActionTypes.PLAY_TRACK_SUCCESS;
    track: Track;
};

type PlayTackFailureAction = {
    type: PlaybackActionTypes.PLAY_TRACK_FAIL;
    error: PlaybackError;
};

type PauseTrackAction = {
    type: PlaybackActionTypes.PAUSE_TRACK;
    progressMillis: number;
};

type ResumeTrackAction = {
    type: PlaybackActionTypes.RESUME_TRACK;
};

type TogglePlaybackErrorAction = {
    type: PlaybackActionTypes.TOGGLE_PLAYBACK_FAIL;
    error: PlaybackError;
};

type PlaybackAction =
    | UpdatePlaybackStateSuccessAction
    | UpdatePlaybackStateFailureAction
    | PlayTrackSuccessAction
    | PlayTackFailureAction
    | PauseTrackAction
    | ResumeTrackAction
    | TogglePlaybackErrorAction;

type PlaybackState = {
    playback: {
        currentTrack: Track | null;
        timestamp: number;
        isPlaying: boolean;
        progressMillis: number;
    };
    error?: PlaybackError;
};

const initialState: PlaybackState = {
    playback: {
        currentTrack: null,
        timestamp: new Date().getTime(),
        isPlaying: false,
        progressMillis: 0,
    },
};

export const updatePlaybackState = () => {
    return (
        dispatch: Dispatch<
            UpdatePlaybackStateSuccessAction | UpdatePlaybackStateFailureAction
        >
    ) => {
        SpotifyClient.getPlaybackState()
            .then(playbackStateResponse => {
                dispatch({
                    type: PlaybackActionTypes.UPDATE_PLAYBACK_STATE_SUCCESS,
                    playbackResponse: playbackStateResponse.data,
                });
            })
            .catch(() => {
                dispatch({
                    type: PlaybackActionTypes.UPDATE_PLAYBACK_STATE_FAIL,
                    error: { message: 'Failed to get current playback state' },
                });
            });
    };
};

export const playTrack = (track: Track) => {
    return async (
        dispatch: Dispatch<PlayTrackSuccessAction | PlayTackFailureAction>
    ) => {
        const trackUri = track.uri;

        if (!trackUri) {
            return dispatch({
                type: PlaybackActionTypes.PLAY_TRACK_FAIL,
                error: { message: 'No trackUri' },
            });
        }

        try {
            await SpotifyClient.playTrack(trackUri);

            return dispatch({
                type: PlaybackActionTypes.PLAY_TRACK_SUCCESS,
                track: track,
            });
        } catch (error) {
            return dispatch({
                type: PlaybackActionTypes.PLAY_TRACK_FAIL,
                error: error,
            });
        }
    };
};

export const pause = () => {
    return (
        dispatch: Dispatch<PauseTrackAction | TogglePlaybackErrorAction>,
        getState: () => RootState
    ) => {
        return SpotifyClient.pausePlayback()
            .then(() => {
                const {
                    progressMillis,
                    timestamp,
                } = getState().playback.playback;
                const progressNow =
                    progressMillis + new Date().getTime() - timestamp;
                dispatch({
                    type: PlaybackActionTypes.PAUSE_TRACK,
                    progressMillis: progressNow,
                });
            })
            .catch(() => {
                dispatch({
                    type: PlaybackActionTypes.TOGGLE_PLAYBACK_FAIL,
                    error: { message: 'Failed to pause track' },
                });
            });
    };
};

export const resume = () => {
    return (
        dispatch: Dispatch<ResumeTrackAction | TogglePlaybackErrorAction>
    ) => {
        SpotifyClient.resumePlayback()
            .then(() => {
                dispatch({ type: PlaybackActionTypes.RESUME_TRACK });
            })
            .catch(() => {
                dispatch({
                    type: PlaybackActionTypes.TOGGLE_PLAYBACK_FAIL,
                    error: { message: 'Failed to resume track' },
                });
            });
    };
};

export const playbackReducer = (
    state = initialState,
    action: PlaybackAction
) => {
    switch (action.type) {
        case PlaybackActionTypes.PLAY_TRACK_SUCCESS:
            return {
                ...state,
                playback: {
                    currentTrack: action.track,
                    progressMillis: 0,
                    isPlaying: true,
                    timestamp: new Date().getTime(),
                },
            };
        case PlaybackActionTypes.PLAY_TRACK_FAIL:
            return {
                ...state,
                error: action.error,
            };
        case PlaybackActionTypes.UPDATE_PLAYBACK_STATE_SUCCESS:
            return {
                ...state,
                playback: {
                    currentTrack: action.playbackResponse.item,
                    progressMillis: action.playbackResponse.progress_ms,
                    isPlaying: action.playbackResponse.is_playing,
                    timestamp: new Date().getTime(),
                },
            };
        case PlaybackActionTypes.UPDATE_PLAYBACK_STATE_FAIL:
            return {
                ...state,
                error: action.error,
            };
        case PlaybackActionTypes.PAUSE_TRACK:
            return {
                ...state,
                playback: {
                    ...state.playback,
                    isPlaying: false,
                    progressMillis: action.progressMillis,
                    timestamp: new Date().getTime(),
                },
            };
        case PlaybackActionTypes.RESUME_TRACK:
            return {
                ...state,
                playback: {
                    ...state.playback,
                    isPlaying: true,
                    timestamp: new Date().getTime(),
                },
            };
        case PlaybackActionTypes.TOGGLE_PLAYBACK_FAIL:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};
