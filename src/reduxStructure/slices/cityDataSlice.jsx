// src/reduxStructure/slices/cityDataSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCity: null,
  allData: [],
  loading: true,
  error: null,
};

const citySlice = createSlice({
  name: "cityData",
  initialState,
  reducers: {
    setCity(state, action) {
      state.selectedCity = action.payload;
    },

    setCityPlaces(state, action) {
      const { allData } = action.payload;
      state.allData = allData;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCity,
  setCityPlaces,
  setLoading,
  setError,
} = citySlice.actions;

export default citySlice.reducer;
