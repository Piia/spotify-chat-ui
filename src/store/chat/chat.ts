import ChatClient from 'chat_client/ChatClient';

import { Set } from 'immutable';
import { Dispatch } from 'redux';
import { ChatMessage as MessageType } from 'components/Chat/Chat.types';
import { RootState } from 'store';

enum ChatActions {
    HISTORY_UPDATE_SUCCESS = 'chat/HISTORY_UPDATE_SUCCESS',
    NEW_MESSAGE = 'chat/NEW_MESSAGE',
    CHATTERS_UPDATE_SUCCESS = 'chat/CHATTERS_UPDATE_SUCCESS',
    CHATTER_JOINED = 'chat/CHATTER_JOINED',
    CHATTER_LEFT = 'chat/CHATTER_LEFT',
}

type GetChattersAction = {
    type: ChatActions.CHATTERS_UPDATE_SUCCESS;
    chatters: Set<string>;
};

type AddChatterAction = {
    type: ChatActions.CHATTER_JOINED;
    userId: string;
};

type RemoveChatterAction = {
    type: ChatActions.CHATTER_LEFT;
    userId: string;
};

type GetChatHistoryAction = {
    type: ChatActions.HISTORY_UPDATE_SUCCESS;
    history: MessageType[];
};

type AddMessageAction = {
    type: ChatActions.NEW_MESSAGE;
    message: MessageType;
};

type ChatActionType =
    | GetChattersAction
    | AddChatterAction
    | RemoveChatterAction
    | GetChatHistoryAction
    | AddMessageAction;

type ChatState = {
    messages: MessageType[];
    chatters: Set<string>;
};

const initialState: ChatState = {
    messages: [],
    chatters: Set(),
};

export const getChatters = (trackId: string) => {
    return (
        dispatch: Dispatch<GetChattersAction>,
        getState: () => RootState
    ) => {
        const state = getState();
        const myUserId = state.profile?.profileData?.id;

        ChatClient.getChatSubscribers(trackId).then(response => {
            const subscribers = response.data.subscribers;

            // always add ourself - our userId may not yet be present in backend API result since we just joined
            // we may also miss our own onSubscribe event
            // the chatters state is a Set, so we can safely add our userId again even if already present
            if (myUserId) {
                subscribers.push(myUserId);
            }

            dispatch({
                type: ChatActions.CHATTERS_UPDATE_SUCCESS,
                chatters: subscribers,
            });
        });
    };
};

export const addChatter = (userId: string) => {
    return (dispatch: Dispatch<AddChatterAction>) => {
        dispatch({
            type: ChatActions.CHATTER_JOINED,
            userId: userId,
        });
    };
};

export const removeChatter = (userId: string) => {
    return (dispatch: Dispatch<RemoveChatterAction>) => {
        dispatch({
            type: ChatActions.CHATTER_LEFT,
            userId: userId,
        });
    };
};

export const getChatHistory = (trackId: string) => {
    return (dispatch: Dispatch<GetChatHistoryAction>) => {
        ChatClient.getChatHistory(trackId).then(response => {
            dispatch({
                type: ChatActions.HISTORY_UPDATE_SUCCESS,
                history: response.data.history,
            });
        });
    };
};

export const addMessage = (message: MessageType) => {
    return (dispatch: Dispatch<AddMessageAction>) => {
        dispatch({
            type: ChatActions.NEW_MESSAGE,
            message: message,
        });
    };
};

export const chatReducer = (state = initialState, action: ChatActionType) => {
    switch (action.type) {
        case ChatActions.HISTORY_UPDATE_SUCCESS:
            return { ...state, messages: action.history };
        case ChatActions.NEW_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat([action.message]),
            };
        case ChatActions.CHATTERS_UPDATE_SUCCESS:
            return { ...state, chatters: Set(action.chatters) };
        case ChatActions.CHATTER_JOINED:
            return { ...state, chatters: state.chatters.add(action.userId) };
        case ChatActions.CHATTER_LEFT:
            return { ...state, chatters: state.chatters.delete(action.userId) };
        default:
            return state;
    }
};
