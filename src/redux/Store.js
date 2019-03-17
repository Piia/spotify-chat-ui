import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { loginReducer } from 'redux/login/login';
import { profileReducer } from 'redux/profile/profile';
import { searchReducer } from 'redux/search/search';


const rootReducer = combineReducers({
    login: loginReducer, 
    profile: profileReducer,
    search: searchReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
