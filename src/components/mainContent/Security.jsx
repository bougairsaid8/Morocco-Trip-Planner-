import React from 'react';
import "./MainContent.css";
import { LuLock } from "react-icons/lu";

function Security() {
  return (
    <div className='security-area'>

      <header className="info-title">
        <h2>Login & Password</h2>
        <p>Manage your account security settings.</p>
      </header>

      <form className="profile-form sec">
        
        <div className="form-field">
          <label>Current Password</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <div className="form-field">
          <label>New Password</label>
          <input type="password" placeholder="••••••••" />
          <span className="field-hint">Minimum 8 characters, at least one number.</span>
        </div>

        <div className="form-field">
          <label>Confirm New Password</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">
            <LuLock style={{marginRight: '8px'}} />
            Update Password
          </button>
          <button type="button" className="discard-btn">Discard</button>
        </div>
      </form>
    </div>
  );
}

export default Security;