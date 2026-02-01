import { SET_TRIP_NAME, ADD_ITEM_TO_DAY ,SAVE_TRIP} from '../types';

export const setTripName = (name) => ({
  type: SET_TRIP_NAME,
  payload: name
});

export const addItemToDay = (dayId, item, category) => ({
  type: ADD_ITEM_TO_DAY,
  payload: { dayId, item, category }
});

export const saveTripAction = (tripData) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const allTrips = JSON.parse(localStorage.getItem('allTrips')) || [];

    const newTrip = {
        ...tripData,
        id: Date.now(),
        userEmail: currentUser.email 
    };

    allTrips.push(newTrip);

    localStorage.setItem('allTrips', JSON.stringify(allTrips));

    return { type: SAVE_TRIP, payload: newTrip };
};