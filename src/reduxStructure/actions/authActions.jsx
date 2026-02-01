import {LOGIN_FAIL ,SET_USER, LOGOUT } from '../types';


export const loginAction = (infos) => {
  const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
  
  const user = allUsers.find(u => u.email === infos.email && u.password === infos.password);

if (user) {

    localStorage.setItem('currentUser', JSON.stringify(user));

    return { type: SET_USER, payload: user };
}
else {

    return { type: LOGIN_FAIL};
  }
};

export const logout = () => {
    localStorage.removeItem('currentUser'); 
    return { type: LOGOUT };
};