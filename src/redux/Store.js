import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { loginReducer } from 'redux/login/login';
import { profileReducer } from 'redux/profile/profile';


const rootReducer = combineReducers({
  login: loginReducer, 
  profile: profileReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));