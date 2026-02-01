
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { tripReducer } from './tripReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  trip: tripReducer
});