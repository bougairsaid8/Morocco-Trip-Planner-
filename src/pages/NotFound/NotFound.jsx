import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="nf-container">
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btnGhost">
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
