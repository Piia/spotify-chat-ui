import SpotifyClient from 'spotify_client/SpotifyClient';
import { Dispatch } from 'redux';

type LoginState = {
    loggedIn: boolean;
    checkingLogin: boolean;
    tokenExpiresIn: number;
};

const initialState: LoginState = {
    loggedIn: false,
    checkingLogin: true,
    tokenExpiresIn: -1,
};

enum LoginActionTypes {
    LOG_IN_SUCCESS = 'login/LOG_IN_SUCCESS',
    CHECKED_LOGIN = 'login/CHECKED_LOGIN',
    REFRESH_ACCESS_TOKEN = 'login/REFRESH_ACCESS_TOKEN',
}

type CheckLoginAction = {
    type: LoginActionTypes.CHECKED_LOGIN;
    expiresIn: number;
    loggedIn: boolean;
};

type RefreshAccessTokenAction = {
    type: LoginActionTypes.REFRESH_ACCESS_TOKEN;
    expiresIn: number;
};

type LoginSuccessAction = {
    type: LoginActionTypes.LOG_IN_SUCCESS;
    expiresIn: number;
};

type LoginAction =
    | CheckLoginAction
    | RefreshAccessTokenAction
    | LoginSuccessAction;

export const login = (authorizationCode: string) => {
    return (dispatch: Dispatch<LoginSuccessAction>) => {
        return SpotifyClient.postAuthenticate(authorizationCode).then(
            accessTokenResponse => {
                dispatch({
                    type: LoginActionTypes.LOG_IN_SUCCESS,
                    expiresIn: accessTokenResponse.data.expiresIn,
                });
            }
        );
    };
};

export const checkLogin = () => {
    return (dispatch: Dispatch<CheckLoginAction>) => {
        return SpotifyClient.getAccessTokenLifetime().then(
            accessTokenResponse => {
                const expiresIn = accessTokenResponse.data.expiresIn;
                if (expiresIn > 0) {
                    dispatch({
                        type: LoginActionTypes.CHECKED_LOGIN,
                        expiresIn: expiresIn,
                        loggedIn: true,
                    });
                } else {
                    dispatch({
                        type: LoginActionTypes.CHECKED_LOGIN,
                        expiresIn: expiresIn,
                        loggedIn: false,
                    });
                }
            },
            error => {
                dispatch({
                    type: LoginActionTypes.CHECKED_LOGIN,
                    expiresIn: -1,
                    loggedIn: false,
                });
            }
        );
    };
};

export const refreshAccessToken = () => {
    return (dispatch: Dispatch<RefreshAccessTokenAction>) => {
        return SpotifyClient.postAccessTokenRefresh().then(
            accessTokenResponse => {
                dispatch({
                    type: LoginActionTypes.REFRESH_ACCESS_TOKEN,
                    expiresIn: accessTokenResponse.data.expiresIn,
                });
            }
        );
    };
};

export const loginReducer = (state = initialState, action: LoginAction) => {
    console.log(action);

    switch (action.type) {
        case LoginActionTypes.LOG_IN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                tokenExpiresIn: action.expiresIn,
            };
        case LoginActionTypes.CHECKED_LOGIN:
            return {
                ...state,
                checkingLogin: false,
                loggedIn: action.loggedIn,
                tokenExpiresIn: action.expiresIn,
            };
        case LoginActionTypes.REFRESH_ACCESS_TOKEN:
            return {
                ...state,
                tokenExpiresIn: action.expiresIn,
            };
        default:
            return state;
    }
};
