import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./TripDetails.css";

import SummaryCard from "../../components/SummaryCard/SummaryCard";
import Timeline from "../../components/Timeline/Timeline";
import PreviewCard from "../../components/PreviewCard/PreviewCard";

import { loadPlanner, resetPlanner } from "../../reduxStructure/slices/plannerSlice";
import {deleteTrip } from '../../reduxStructure/slices/savedTripsSlice'
export default function TripDetails() {
  // route defined as /tripDetails/:tripId
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const navigate =useNavigate()

  const trips = useSelector((s) => s.savedTrips.trips);
  const planner = useSelector((s) => s.planner);

  // find trip matching the id from params
  const trip = trips.find((t) => t.id === tripId);

  const [previewPlace, setPreviewPlace] = useState(null);

  // حمّل plannerSnapshot ديال التريب
  useEffect(() => {
    if (trip?.plannerSnapshot) {
      dispatch(loadPlanner(trip.plannerSnapshot));
    } else {
      dispatch(resetPlanner());
    }  
   }, [dispatch, trip]);

  if (!trip) {
    return <div className="td-notfound">Trip not found</div>;
  }

  // stats محسوبة من planner
 const stats = {
  days: planner.days.length,

  hotels: planner.days.reduce(
    (acc, day) =>
      acc +
      (day.items || []).filter(
        (x) => x.category?.toLowerCase().includes("hotel")
      ).length,
    0
  ),

  activities: planner.days.reduce(
    (acc, day) =>
      acc +
      (day.items || []).filter(
        (x) => x.category?.toLowerCase().includes("activity")
      ).length,
    0
  ),

  restaurants: planner.days.reduce(
    (acc, day) =>
      acc +
      (day.items || []).filter(
        (x) => x.category?.toLowerCase().includes("restaurant")
      ).length,
    0
  ),
};


  return (
    <div className="td-layout">
      {/* LEFT */}
      <SummaryCard
        title={trip.name}
        city={trip.city}
        createdAt={new Date(trip.createdAt).toLocaleDateString()}
        total={trip.total}
        currency="MAD"
        stats={stats}
        onEdit={() =>  navigate(`/planner/${trip.city}`)}
        onDelete={() => {
          dispatch(deleteTrip(trip.id));
          navigate("/")
        }}
      />

      {/* CENTER */}
      <Timeline
        days={planner.days}
        currency="MAD"
        onSelectPlace={(place) => setPreviewPlace(place)}
      />

      {/* RIGHT */}
      <PreviewCard place={previewPlace} currency="MAD" />
    </div>
  );
}
