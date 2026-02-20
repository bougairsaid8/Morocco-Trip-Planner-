import React from "react";
import { useNavigate } from "react-router-dom";
import {  LuArrowLeft } from "react-icons/lu";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="nf-wrap">
      <div className="nf-card">
        <div className="nf-badge">404</div>

        <h1 className="nf-title">Page not found</h1>
        <p className="nf-sub">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="nf-actions">
          <button className="nf-btn nf-btn-ghost" onClick={() => navigate(-1)}>
            <LuArrowLeft /> Go Back
          </button>

          <button className="nf-btn nf-btn-main" onClick={() => navigate("/")}>
          Back Home
          </button>
        </div>
      </div>
    </div>
  );
}