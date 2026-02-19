import React from 'react';
import "./MainContent.css";
import { LuSearch, LuMapPin, LuPlus } from "react-icons/lu";

function MyTrips() {
  const trips = [
    { id: 1, title: "Marrakech Adventure", location: "MARRAKECH", budget: "1,200", days: "5 Days", img: "marrakech.jpg" },
    { id: 2, title: "Chefchaouen Blue Pearl", location: "CHEFCHAOUEN", budget: "850", days: "3 Days", img: "chef.jpg" },
    { id: 3, title: "Chefchaouen Blue Pearl", location: "CHEFCHAOUEN", budget: "850", days: "3 Days", img: "chef.jpg" },
  ];

  return (
    <div className='trips-area'>
      {/* 1️⃣ الـ عنوان */}
      <header className="info-title">
        <h2>My Trips</h2>
        <p>Manage your upcoming and past journeys.</p>
      </header>

      {/* 2️⃣ بـارتي الـ بـحث (Search Bar) */}
      <div className="search-container">
        <LuSearch className="search-icon" />
        <input type="text" placeholder="Search your trips..." />
      </div>

      {/* 3️⃣ الـ شبـكة ديال الـ رحلات (Trips Grid) */}
      <div className="trips-grid">
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card">
            <div className="trip-image">
               <div className="days-badge">{trip.days}</div>
            </div>
            <div className="trip-details">
              <span className="location-tag">
                <LuMapPin size={12} /> {trip.location}
              </span>
              <h3>{trip.title}</h3>
              <p className="budget-text">Budget: <strong>${trip.budget}</strong></p>
              
              <div className="card-actions">
                <button className="edit-btn">Edit</button>
                <button className="view-details">View Details</button>
              </div>
            </div>
          </div>
        ))}

        {/* 4️⃣ بـلاصة إضـافة رحـلة جـديـدة */}
        <div className="add-trip-placeholder">
           <div className="plus-icon"><LuPlus /></div>
           <p>Plan new trip</p>
        </div>
      </div>
    </div>
  );
}

export default MyTrips;