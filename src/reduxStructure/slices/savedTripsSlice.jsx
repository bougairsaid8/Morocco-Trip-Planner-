// src/reduxStructure/slices/savedTripsSlice.jsx
import { createSlice, nanoid } from "@reduxjs/toolkit";

const getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"));

const findUserTrips = () => {
  const user = getCurrentUser();
  const allTrips = JSON.parse(localStorage.getItem("allTrips")) || [];
  if (!user) return [];
  return allTrips.filter(t => t.userEmail === user.email);
};

const savedTripsSlice = createSlice({
  name: "savedTrips",
  initialState: { trips: findUserTrips() },
  reducers: {
    reloadTrips(state) {
      state.trips = findUserTrips();
    },

    saveTrip: {
      prepare({ name, city, total, plannerSnapshot }) {
        const user = getCurrentUser();
        return {
          payload: {
            id: nanoid(),
            userEmail: user?.email || "unknown",
            name,
            city,
            total,
            plannerSnapshot,
            createdAt: Date.now(),
          },
        };
      },
      reducer(state, action) {
        // 1) redux
        state.trips.push(action.payload);

        // 2) localStorage: allTrips
        const allTrips = JSON.parse(localStorage.getItem("allTrips")) || [];
        allTrips.push(action.payload);
        localStorage.setItem("allTrips", JSON.stringify(allTrips));
      },
    },

    deleteTrip(state, action) {
      const id = action.payload;

      // redux
      state.trips = state.trips.filter(t => t.id !== id);

      // localStorage
      const allTrips = JSON.parse(localStorage.getItem("allTrips")) || [];
      const newAll = allTrips.filter(t => t.id !== id);
      localStorage.setItem("allTrips", JSON.stringify(newAll));
    },
  },
});

export const { saveTrip, deleteTrip, reloadTrips } = savedTripsSlice.actions;
export default savedTripsSlice.reducer;
