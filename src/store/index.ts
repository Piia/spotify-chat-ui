import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { loginReducer } from 'store/login/login';
import { profileReducer } from 'store/profile/profile';
import { searchReducer } from 'store/search/search';
import { playbackReducer } from 'store/playback/playback';
import { chatReducer } from 'store/chat/chat';

const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    search: searchReducer,
    playback: playbackReducer,
    chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
