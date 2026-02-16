// src/reduxStructure/store.jsx
import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice"
import cityDataReducer from "./slices/cityDataSlice";
import plannerReducer from "./slices/plannerSlice";
import savedTripsReducer from "./slices/savedTripsSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        cityData: cityDataReducer,
        planner: plannerReducer,
        savedTrips: savedTripsReducer,
    }
})