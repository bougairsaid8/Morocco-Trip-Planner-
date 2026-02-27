import React from "react";
import "./notification.css";

export default function Notification({ message, onClose }) {
  return (
    <div className="toast">
      <div className="toast-icon">✓</div>

      <div className="toast-content">
        <h4>Successfully saved!</h4>
        <p>{message}</p>
      </div>

      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
}