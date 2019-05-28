import ChatClient from 'chat_client/ChatClient';

import { get } from 'lodash';
import { Set } from 'immutable';

const initialState = {
    messages: [],
    chatters: Set()
};


const HISTORY_UPDATE_SUCCESS = 'chat/HISTORY_UPDATE_SUCCESS';
const NEW_MESSAGE = 'chat/NEW_MESSAGE';


const CHATTERS_UPDATE_SUCCESS = 'chat/CHATTERS_UPDATE_SUCCESS';
const CHATTER_JOINED  = 'chat/CHATTER_JOINED';
const CHATTER_LEFT = 'chat/CHATTER_LEFT';
// const CHATTER_DISCONNECTED = 'chat/CHATTER_DISCONNECTED';


export const getChatters = trackId => {
    return (dispatch, getState) => {
        const state = getState();
        const myUserId = get(state, 'profile.profileData.id');

        ChatClient.getChatSubscribers(trackId).then(response => {
            const subscribers = response.data.subscribers;

            // always add ourself - our userId may not yet be present in backend API result since we just joined
            // we may also miss our own onSubscribe event
            // the chatters state is a Set, so we can safely add our userId again even if already present
            if(myUserId) {
                subscribers.push(myUserId);
            }

            dispatch({
                type: CHATTERS_UPDATE_SUCCESS,
                chatters: subscribers
            });
        });
    };
};


export const addChatter = userId => {
    console.log("adding chatter");
    return dispatch => {
        dispatch({
            type: CHATTER_JOINED,
            userId: userId
        });
    };
};


export const removeChatter = userId => {
    return dispatch => {
        dispatch({
            type: CHATTER_LEFT,
            userId: userId
        });
    };
};

export const getChatHistory = trackId => {
    return dispatch => {
        ChatClient.getChatHistory(trackId).then(response => {
            dispatch({
                type: HISTORY_UPDATE_SUCCESS,
                history: response.data.history
            });
        });
    };
};


export const addMessage = message => {
    return dispatch => {
        dispatch({
            type: NEW_MESSAGE,
            message: message
        });
    };
}


export const chatReducer = (state = initialState, action) => ({
    [HISTORY_UPDATE_SUCCESS]: ({
        ...state,
        messages: action.history
    }),
    [NEW_MESSAGE]: ({
        ...state,
        messages: state.messages.concat([action.message])
    }),
    [CHATTERS_UPDATE_SUCCESS]: ({
        ...state,
        chatters: Set(action.chatters)
    }),
    [CHATTER_JOINED]: ({
        ...state,
        chatters: state.chatters.add(action.userId)
    }),
    [CHATTER_LEFT]: ({
        ...state,
        chatters: state.chatters.delete(action.userId)
    })
})[action.type] || state;
