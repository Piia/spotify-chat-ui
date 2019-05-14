import ChatClient from 'chat_client/ChatClient';


const initialState = {
    messages: []
};


const HISTORY_UPDATE_SUCCESS = 'chat/HISTORY_UPDATE_SUCCESS';
const NEW_MESSAGE = 'chat/NEW_MESSAGE';


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
    [NEW_MESSAGE] : ({
        ...state,
        messages: state.messages.concat([action.message])
    })
})[action.type] || state;
