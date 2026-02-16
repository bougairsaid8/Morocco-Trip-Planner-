// src/reduxStructure/reducers/authReducer.jsx
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: JSON.parse(localStorage.getItem('currentUser')) || null, 
    isAuthenticated: !!localStorage.getItem('currentUser'),
    error:null,
    message:null
  }
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        signup:(state,action)=>{
            const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
            const isExist = allUsers.find(u => u.email === action.payload.email);

            if (isExist) {
                state.error = "This account already exists!";
                state.isAuthenticated = false;
                state.message = null;
            } else {
                const user = {
                  username:action.payload.username,
                  email:action.payload.email,
                  password:action.payload.password,
                  avatare:null,
                  trips:null
                }
                allUsers.push(user);
                localStorage.setItem('allUsers', JSON.stringify(allUsers));
                localStorage.setItem('currentUser', JSON.stringify(user));
                state.user = user;
                state.isAuthenticated = true;
                state.error = null;
                state.message = "Account created successfully!";
            }
        },
        login:(state,action)=>{
          const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
          const user = allUsers.find(u => u.email === action.payload.email && u.password === action.payload.password);
          if (user) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              state.user = user;
              state.isAuthenticated = true;
              state.error = null;
          }else {
              state.user = null;
              state.isAuthenticated = false;
              state.error = "user not found ";
          }
        },
        clearAuthError:(state)=>{
            state.error = null;
        },
        logout:(state)=>{
            localStorage.removeItem('currentUser'); 
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.message = null;
        },
        resetPassword: (state, action) => {
          const { email, newPassword } = action.payload;
          let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
          const userIndex = allUsers.findIndex(u => u.email === email);

          if (userIndex !== -1) {
              allUsers[userIndex].password = newPassword;
              localStorage.setItem('allUsers', JSON.stringify(allUsers));

              const updatedUser = allUsers[userIndex];
              localStorage.setItem('currentUser', JSON.stringify(updatedUser));

              state.user = updatedUser;
              state.isAuthenticated = true;
              state.error = null;
              state.message = "Password reset successfully and logged in!";
          } else {
              state.error = "This email address is not registered";
              state.message = null;
          }
      }
    }
});

export const {signup,login,clearAuthError,logout,resetPassword} = authSlice.actions;

export default authSlice.reducer