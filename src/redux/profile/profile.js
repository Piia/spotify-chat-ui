import SpotifyClient from 'spotify_client/SpotifyClient';


const ACTIONS =  {
    ADD_PROFILE_DATA: 'ADD_PROFILE_DATA'
};

export function loadProfile() {
    return function(dispatch, getState) {
        return SpotifyClient.getMyProfile().then( myProfileResponse => {
            const action = {
                type: ACTIONS.ADD_PROFILE_DATA,
                profileData: myProfileResponse.data
            };
            dispatch(action);
        });
    };
}

const initialState = {
    profileData: null
}

export const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.ADD_PROFILE_DATA:
            return {
                ...state,
                profileData: action.profileData
            };

        default: 
            return state;
    }
}