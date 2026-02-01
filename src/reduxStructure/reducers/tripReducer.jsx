import { SET_TRIP_NAME, ADD_ITEM_TO_DAY, SAVE_COMPLETED_TRIP } from '../types';

const getInitialTrips = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allTrips = JSON.parse(localStorage.getItem('allTrips')) || [];
    if (!currentUser) return [];

    return allTrips.filter(trip => trip.userEmail === currentUser.email);
};

const initialState = {
  tripName: "",
  currentTrip: getInitialTrips(),
  savedTrips: [],
  totalCost: 0
};

export const tripReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_TRIP_NAME:
      return { ...state, tripName: action.payload };

    case ADD_ITEM_TO_DAY:
      const { dayId, item, category } = action.payload; 

      const updatedTrip = state.currentTrip.map(day => {
        if (day.id === dayId) {
          return { ...day, [category]: [...day[category], item] };
        }
        return day;
      });

      return { 
        ...state, 
        currentTrip: updatedTrip,
        totalCost: state.totalCost + (item.price || 0) 
      };

    case SAVE_COMPLETED_TRIP:
      return {
        ...state,
        savedTrips: [...state.savedTrips, action.payload],
        currentTrip: [{ id: "Day1", hotels: [], activities: [], restaurants: [] }], 
        totalCost: 0,
        tripName:""
      };

    default:
      return state;
  }
};