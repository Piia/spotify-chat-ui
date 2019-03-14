import SpotifyClient from 'spotify_client/SpotifyClient';


export function login(authorizationCode) {
    return function(dispatch, getState) {
        return SpotifyClient.postAuthenticate(authorizationCode).then( tokenLifeTime => {
            dispatch( { type: ACTIONS.LOG_IN } )
        });
    };
}


export const ACTIONS = {
    LOG_IN: 'LOG_IN'
};

const initialState = {
    loggedIn: false
}

export function loginReducer(state = initialState, action) {
    switch (action.type) {
      case ACTIONS.LOG_IN:
        return {
            ...state,
            loggedIn: true
        }
      default:
        return state
    }
  }

