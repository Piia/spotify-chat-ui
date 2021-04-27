import SpotifyClient from 'spotify_client/SpotifyClient';

const initialState = {
    loggedIn: false,
    checkingLogin: true,
    tokenExpiresIn: -1,
};

const LOG_IN_SUCCESS = 'login/LOG_IN_SUCCESS';
const CHECKED_LOGIN = 'login/CHECKED_LOGIN';
const REFRESH_ACCESS_TOKEN = 'login/REFRESH_ACCESS_TOKEN';

export const login = authorizationCode => {
    return dispatch => {
        return SpotifyClient.postAuthenticate(authorizationCode).then(
            accessTokenResponse => {
                dispatch({
                    type: LOG_IN_SUCCESS,
                    expiresIn: accessTokenResponse.data.expiresIn,
                });
            }
        );
    };
};

export const checkLogin = () => {
    return dispatch => {
        return SpotifyClient.getAccessTokenLifetime().then(
            accessTokenResponse => {
                const expiresIn = accessTokenResponse.data.expiresIn;
                if (expiresIn > 0) {
                    dispatch({
                        type: CHECKED_LOGIN,
                        expiresIn: expiresIn,
                        loggedIn: true,
                    });
                } else {
                    dispatch({
                        type: CHECKED_LOGIN,
                        expiresIn: expiresIn,
                        loggedIn: false,
                    });
                }
            },
            error => {
                dispatch({
                    type: CHECKED_LOGIN,
                    expiresIn: -1,
                    loggedIn: false,
                });
            }
        );
    };
};

export const refreshAccessToken = () => {
    return dispatch => {
        return SpotifyClient.postAccessTokenRefresh().then(
            accessTokenResponse => {
                dispatch({
                    type: REFRESH_ACCESS_TOKEN,
                    expiresIn: accessTokenResponse.data.expiresIn,
                });
            }
        );
    };
};

export const loginReducer = (state = initialState, action) =>
    ({
        [LOG_IN_SUCCESS]: {
            ...state,
            loggedIn: true,
            tokenExpiresIn: action.expiresIn,
        },
        [CHECKED_LOGIN]: {
            ...state,
            checkingLogin: false,
            loggedIn: action.loggedIn,
            tokenExpiresIn: action.expiresIn,
        },
        [REFRESH_ACCESS_TOKEN]: {
            ...state,
            tokenExpiresIn: action.expiresIn,
        },
    }[action.type] || state);
