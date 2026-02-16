// src/reduxStructure/selectors.jsx
// 1.Auth  Selectors :
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthMessage = (state) => state.auth.message;
export const selectAuthError = (state) => state.auth.error;

// 2 .planner Selectors :
// This selector returns the entire planner state 
export const selectPlanner = s => s.planner;
// This selector returns the currently selected day 
export const selectSelectedDay = s =>
  s.planner.days.find(d => d.id === s.planner.selectedDayId);
// This selector returns the items of the currently selected day
export const selectSelectedDayItems = s => {
  const day = s.planner.days.find(d => d.id === s.planner.selectedDayId);
  return day ? day.items : [];
}
export const selectCity= s => s.cityData.selectedCity

export const selectTripTotal = s =>
  s.planner.days.flatMap(d => d.items)
    .reduce((sum, i) => sum + (i.price || 0), 0);

// // 3 .city Selectors :
// export const selectCityPlaces = s => s.cityData.places;

// // 4 .saved Selectors :
// export const selectSavedTrips = s => s.savedTrips.trips;
