import SpotifyClient from 'spotify_client/SpotifyClient';


const initialState = {
    profileData: null
}


const LOAD_PROFILE_SUCCESS = 'profile/LOAD_PROFILE_SUCCESS';

export const loadProfile = () => {
    return dispatch => {
        return SpotifyClient.getMyProfile()
            .then(result => {
                dispatch({
                    type: LOAD_PROFILE_SUCCESS,
                    profileData: result.data
                });
            });
    };
}

export const profileReducer = (state = initialState, action) => ({
    [LOAD_PROFILE_SUCCESS]: ({
        ...state,
        profileData: action.profileData
    }),
})[action.type] || state;
