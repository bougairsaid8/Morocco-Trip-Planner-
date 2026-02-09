// 1.Auth  Selectors :
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthMessage = (state) => state.auth.message;
export const selectAuthError = (state) => state.auth.error;

// 2. Current Trip Selectors : 
export const selectCurrentTrip = (state) => state.trip.currentTrip;
export const selectTripName = (state) => state.trip.tripName;
export const selectTotalCost = (state) => state.trip.totalCost;

// 3.Saved Trips Selectors :
export const selectAllSavedTrips = (state) => state.trip.savedTrips;


