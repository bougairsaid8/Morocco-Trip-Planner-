import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoLocationSharp, IoTrashOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import {deleteTrip } from '../../reduxStructure/slices/savedTripsSlice'


import "./TripCard.css";


function calcDays(trip) {
  const days = trip?.plannerSnapshot?.days || trip?.days || [];
  return days.length;
}

export default  function TripCard({trip}) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  if (!trip) return null;
  return (
    <article className="tc-card">
      <div className="tc-img" style={{ backgroundImage: `url(${trip.image})` }} />

      <div className="tc-body">
        <div className="tc-head">
          <div className="tc-titles">
            <h3 className="tc-title">{trip.name || "Untitled Trip"}</h3>

            <p className="tc-sub">
              <IoLocationSharp className="tc-ico" />
              <span>{trip.city || "Unknown city"}</span>
            </p>
          </div>

          <div className="action_trips">
                <button
                    className="tc-delete"
                    title="View Details trip"
                >
                    <TbListDetails onClick={()=>navigate(`/tripDetails/${trip.id}`)}/>
                </button>
                <button
                    className="tc-delete"
                    title="Delete trip"
                >
                    <IoTrashOutline onClick={()=> dispatch(deleteTrip(trip.id))}/>
                </button>
          </div>
        </div>


        <div className="tc-metrics">
          <div className="tc-metric">
            <span className="tc-label">TOTAL</span>
            <strong className="tc-value">
              {`${(trip.total).toFixed(2)} MAD` }
            </strong>
          </div>

          <div className="tc-metric">
            <span className="tc-label">DAYS</span>
            <strong className="tc-value">{calcDays(trip) || "—"}</strong>
          </div>
        </div>

        
      </div>
    </article>
  );
}


