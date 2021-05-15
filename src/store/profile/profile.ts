import SpotifyClient from 'spotify_client/SpotifyClient';
import { Dispatch } from 'redux';

type ProfileState = {
    profileData: ProfileData | null;
};

type ProfileData = {
    id: string;
};

const initialState: ProfileState = {
    profileData: null,
};

enum ProfileActionTypes {
    LOAD_PROFILE_SUCCESS = 'profile/LOAD_PROFILE_SUCCESS',
}

type LoadProfileAction = {
    type: ProfileActionTypes.LOAD_PROFILE_SUCCESS;
    profileData: ProfileData;
};

type ProfileAction = LoadProfileAction;

export const loadProfile = () => {
    return (dispatch: Dispatch<LoadProfileAction>) => {
        return SpotifyClient.getMyProfile().then(result => {
            dispatch({
                type: ProfileActionTypes.LOAD_PROFILE_SUCCESS,
                profileData: result.data,
            });
        });
    };
};

export const profileReducer = (state = initialState, action: ProfileAction) => {
    switch (action.type) {
        case ProfileActionTypes.LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                profileData: action.profileData,
            };
        default:
            return state;
    }
};
