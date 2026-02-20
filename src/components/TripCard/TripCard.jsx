import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LuMapPin } from "react-icons/lu";
import { TbListDetails } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import { deleteTrip } from "../../reduxStructure/slices/savedTripsSlice";
import "./TripCard.css";

function calcDays(trip) {
  const days = trip?.plannerSnapshot?.days || trip?.days || [];
  return days.length;
}

export default function TripCard({ trip }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!trip) return null;

  return (
    <article className="mt-card">

      {/* IMAGE */}
      <div
        className="mt-card-image"
        style={{ backgroundImage: `url(${trip.image})` }}
      >
        <div className="mt-days-badge">
          {calcDays(trip)} Days
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-card-body">

        <span className="mt-location">
          <LuMapPin size={12} /> {trip.city || "Unknown city"}
        </span>

        <h3 className="mt-title">
          {trip.name || "Untitled Trip"}
        </h3>

        <p className="mt-budget">
          Budget: <strong>{trip.total?.toFixed(2)} MAD</strong>
        </p>

        {/* ACTION ICONS */}
        <div className="mt-actions">
          <button
            className="mt-icon-btn mt-details"
            title="View details"
            onClick={() => navigate(`/tripDetails/${trip.id}`)}
          >
            <TbListDetails />
          </button>

          <button
            className="mt-icon-btn mt-delete"
            title="Delete trip"
            onClick={() => dispatch(deleteTrip(trip.id))}
          >
            <IoTrashOutline />
          </button>
        </div>

      </div>
    </article>
  );
}