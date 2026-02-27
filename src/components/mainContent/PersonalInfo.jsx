import React ,{useState} from 'react'
import "./MainContent.css"
import { useSelector,useDispatch } from 'react-redux';
import {updateProfile,clearAuthError} from '../../reduxStructure/slices/authSlice'

import img from '../../assets/profile/oussama.jpg'
import Notification from './Notification';

function PersonalInfo() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const message = useSelector((s) => s.auth.message);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile({
      bio,
      username,
      email
    }));

  };
  return (
<div className='personal-info-area'>
      {
        message && <Notification message={message} onClose={() => dispatch(clearAuthError())} />
      }
      {/* العنوان */}
      <header className="info-title">
        <h2>Personal Information</h2>
        <p>Update your personal details and public profile.</p>
      </header>

      {/* سيكشن التصويرة */}
      <div className="photo-upload-row">
        <div className="avatar-img" style={{backgroundImage:`url(${img})`}} ></div>
        <div className="photo-instructions">
          <h3>Profile Photo</h3>
          <p>{bio}</p>
        </div>
      </div>

      {/* الـ Form */}
      <form className="profile-form" onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-field">
          <label>Full Name</label>
          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        </div>

        <div className="form-field">
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <span className="field-hint">We will send travel updates to this address.</span>
        </div>

        <div className="form-field">
          <label>Bio</label>
          <textarea
            placeholder="Tell us a little about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn" >Save Changes</button>
        </div>
      </form>
    </div>
  )
}

export default PersonalInfo
