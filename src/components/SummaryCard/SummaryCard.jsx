import React from "react";
import { LuMapPin, LuPencilLine, LuListChecks, LuTrash2 } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import "./SummaryCard.css";

export default function SummaryCard({
  title,
  city,
  createdAt,
  total,
  currency = "MAD",
  stats = { days: 0, places: 0, hotels: 0, activities: 0 ,restaurants:0},
  onEdit,
  onDelete,
}) {
  return (
    <aside className="sc-card">
      <div className="sc-head">
        <h3>{title}</h3>
        
      </div>

      <div className="sc-meta">
        <span className="sc-meta-item">
          <IoLocationSharp /> {city}
        </span>
        <span className="sc-dot">•</span>
        <span className="sc-meta-item">{createdAt}</span>
      </div>

      <div className="sc-budget">
        <p className="sc-label">TOTAL BUDGET</p>
        <p className="sc-budget-value">
          {Number(total || 0).toFixed(2)} {currency}
        </p>
      </div>

      <div className="sc-stats">
        {[
          ["Days", stats.days],
          ["Restaurants", stats.restaurants],
          ["Hotels", stats.hotels],
          ["Activities", stats.activities],
        ].map(([k, v]) => (
          <div className="sc-stat" key={k}>
            <p className="sc-stat-label">{k}</p>
            <p className="sc-stat-value">{v}</p>
          </div>
        ))}
      </div>

      <div className="sc-actions">
        <button className="sc-btn sc-btn-primary" onClick={onEdit} type="button">
          <FaEdit />
          Continue Editing
        </button>

        <button className="sc-btn sc-btn-danger" onClick={onDelete} type="button">
          <LuTrash2 />
          Delete Trip
        </button>
      </div>
    </aside>
  );
}
