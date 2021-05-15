import SpotifyClient from 'spotify_client/SpotifyClient';
import { Dispatch } from 'redux';
import { Track } from 'store/spotify.types';

type ErrorType = { message: string };

type SearchState = {
    tracks: Track[];
    loading: boolean;
    error?: ErrorType;
};

const initialState: SearchState = {
    tracks: [],
    loading: false,
};

enum SearchActionTypes {
    SEARCH_TRACKS = 'search/SEARCH_TRACKS',
    SEARCH_TRACKS_SUCCESS = 'search/SEARCH_TRACKS_SUCCESS',
    SEARCH_TRACKS_FAIL = 'search/SEARCH_TRACKS_FAIL',
}

type SearchTracksAction = {
    type: SearchActionTypes.SEARCH_TRACKS;
};

type SearchTracksSuccessAction = {
    type: SearchActionTypes.SEARCH_TRACKS_SUCCESS;
    searchResponse: {
        items: Track[];
    };
};

type SearchTracksFailureAction = {
    type: SearchActionTypes.SEARCH_TRACKS_FAIL;
    error: ErrorType;
};

type SearchActions =
    | SearchTracksAction
    | SearchTracksSuccessAction
    | SearchTracksFailureAction;

export const searchTracks = (trackName: string) => {
    return async (dispatch: Dispatch<SearchActions>) => {
        dispatch({
            type: SearchActionTypes.SEARCH_TRACKS,
        });

        if (!trackName) {
            return dispatch({
                type: SearchActionTypes.SEARCH_TRACKS_FAIL,
                error: { message: 'No trackName' },
            });
        }

        try {
            const result = await SpotifyClient.searchTracks(trackName);
            return dispatch({
                type: SearchActionTypes.SEARCH_TRACKS_SUCCESS,
                searchResponse: result.data,
            });
        } catch (error) {
            return dispatch({
                type: SearchActionTypes.SEARCH_TRACKS_FAIL,
                error: error,
            });
        }
    };
};

export const searchReducer = (state = initialState, action: SearchActions) => {
    switch (action.type) {
        case SearchActionTypes.SEARCH_TRACKS:
            return {
                ...state,
                loading: true,
            };
        case SearchActionTypes.SEARCH_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.searchResponse.items,
                loading: false,
                error: undefined,
            };
        case SearchActionTypes.SEARCH_TRACKS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
