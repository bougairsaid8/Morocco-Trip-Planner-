import {LOGIN_FAIL, SET_USER, LOGOUT } from '../types';

// initialState : 
const initialState = {
  user: JSON.parse(localStorage.getItem('currentUser')) || null, 
  isAuthenticated: !!localStorage.getItem('currentUser'),
  loginError:null
  
};

// reducer :
export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER:
      return { ...state, user: action.payload, isAuthenticated: true ,loginError: null};
    
    case LOGIN_FAIL:
      return { ...state, user: null, isAuthenticated: false, loginError: "Email or Password incorrect!" };

    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false };

    default:
      return state;
  }
};