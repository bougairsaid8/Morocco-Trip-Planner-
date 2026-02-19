import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import SummaryCard from '../../components/SummaryCard/SummaryCard';
import TripCard from '../../components/TripCard/TripCard'
// import { deleteTrip } from '../../reduxStructure/slices/savedTripsSlice';
// import { loadPlanner } from '../../reduxStructure/slices/plannerSlice';
import './MyTrips.css';

function MyTrips() {
  const trips = useSelector((s) => s.savedTrips.trips || []);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className='container_MyTrips'>
      <div className='head_MyTrips'>
        <h2>MyTrips</h2>
      </div>
      <div className="cards">
        {trips.length > 0 ? (
          trips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <div className="empty_trips">
            <div className="empty_box">
              <h2>No trips yet</h2>
              <p>Create your first trip and start planning your itinerary.</p>

              <button className="empty_btn" onClick={() => navigate("/")}>
                Create a Trip
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default MyTrips;


