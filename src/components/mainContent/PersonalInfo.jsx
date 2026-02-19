import React from 'react'
import "./MainContent.css"

function PersonalInfo() {
  return (
<div className='personal-info-area'>
      {/* العنوان */}
      <header className="info-title">
        <h2>Personal Information</h2>
        <p>Update your personal details and public profile.</p>
      </header>

      {/* سيكشن التصويرة */}
      <div className="photo-upload-row">
        <div className="avatar-img" ></div>
        <div className="photo-instructions">
          <h3>Profile Photo</h3>
          <p>This will be displayed on your profile and shared with trip companions.</p>
        </div>
      </div>

      {/* الـ Form */}
      <form className="profile-form">
        <div className="form-field">
          <label>Full Name</label>
          <input type="text" defaultValue="Alex Morgan" />
        </div>

        <div className="form-field">
          <label>Email Address</label>
          <input type="email" defaultValue="alex.morgan@example.com" />
          <span className="field-hint">We will send travel updates to this address.</span>
        </div>

        <div className="form-field">
          <label>Bio</label>
          <textarea defaultValue="Digital Nomad exploring North Africa."></textarea>
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" className="discard-btn">Discard</button>
        </div>
      </form>
    </div>
  )
}

export default PersonalInfo
