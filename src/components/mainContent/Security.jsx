import React, { useState } from "react";
import "./MainContent.css";
import { LuLock } from "react-icons/lu";
import { useDispatch ,useSelector} from "react-redux";
import { changePassword, clearAuthError } from "../../reduxStructure/slices/authSlice"; 

function Security() {
  const dispatch = useDispatch();
  
  const message = useSelector((s) => s.auth.message);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearAuthError());

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(changePassword({ currentPassword, newPassword }));
     console.log(message)
  };

  const handleDiscard = () => {
    dispatch(clearAuthError());
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="security-area">
      <header className="info-title">
        <h2>Login & Password</h2>
        <p>Manage your account security settings.</p>
      </header>

      

      <form className="profile-form sec" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Current Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span className="field-hint">Minimum 8 characters, at least one number.</span>
        </div>

        <div className="form-field">
          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">
            <LuLock style={{ marginRight: "8px" }} />
            Update Password
          </button>

          <button type="button" className="discard-btn" onClick={handleDiscard}>
            Discard
          </button>
        </div>
      </form>
    </div>
  );
}

export default Security;