
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TripCard from "../../components/TripCard/TripCard";
import { LuSearch, LuPlus } from "react-icons/lu";
import "./MyTrips.css";

function MyTrips() {
  const trips = useSelector((s) => s.savedTrips.trips || []);
  const navigate = useNavigate();

  const [q, setQ] = useState("");

  const filteredTrips = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return trips;

    return trips.filter((t) => {
      const title = (t?.name || "").toLowerCase();
      const city = (t?.city || "").toLowerCase();
      return `${title} ${city}`.includes(s);
    });
  }, [q, trips]);

  return (
    <div className="trips-page">
      <header className="trips-head">
        <div className="trips-title">
          <h2>My Trips</h2>
          <p>Manage your upcoming and past journeys.</p>
        </div>
      </header>

      

      {trips.length === 0 ? (
        <div className="empty_trips">
          <div className="empty_box">
            <h2>No trips yet</h2>
            <p>Create your first trip and start planning your itinerary.</p>

            <button className="empty_btn" onClick={() => navigate("/")}>
              Create a Trip
            </button>
          </div>
        </div>
      ) : (
        <section className="trips-grid">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} variant="grid" />
          ))}

          <button className="trip-add" onClick={() => navigate("/")}>
            <div className="trip-add-circle">
              <LuPlus />
            </div>
            <p>Plan new trip</p>
          </button>
        </section>
      )}
    </div>
  );
}

export default MyTrips;
