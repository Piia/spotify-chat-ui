import SpotifyClient from 'spotify_client/SpotifyClient';


const initialState = {
    loggedIn: false,
};

const LOG_IN_SUCCESS = 'login/LOG_IN_SUCCESS';

export const login = authorizationCode => {
    return dispatch => {
        return SpotifyClient.postAuthenticate(authorizationCode)
            .then(tokenLifeTime => {
                dispatch({
                    type: LOG_IN_SUCCESS,
                    tokenLifeTime
                });
            });
    };
};

export const loginReducer = (state = initialState, action) => ({
    [LOG_IN_SUCCESS]: ({
        ...state,
        loggedIn: true,
    }),
})[action.type] || state;

