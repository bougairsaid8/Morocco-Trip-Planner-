import React from 'react';
import "./ProfileAside.css";
import { LuUser, LuShieldCheck, LuMap, LuLogOut } from "react-icons/lu";

function ProfileAside({selected,setSelected}) {
  return (
    <div className='aswrapper'>
      <div className='up'>
      <div className='personalInfo'>
       <button className={`nav-item ${selected === "personalInfo" ? "active" : ""}`} onClick={() => setSelected("personalInfo")}>
          <div className="item-content">
            <LuUser className="nav-icon" />
              <span>Personal Info</span>
          </div>
          {selected === "personalInfo" && <span className="active-dot"></span>}
        </button>
      </div>
     

      <div className='Security'>
       <button className={`nav-item ${selected === "Security" ? "active" : ""}`} onClick={() => setSelected("Security")}>
          <div className="item-content">
            <LuShieldCheck className="nav-icon" />
              <span>Security</span>
          </div>
          {selected === "Security" && <span className="active-dot"></span>}
        </button>
      </div>

      <div className='MyTrips'>
       <button className={`nav-item ${selected === "MyTrips" ? "active" : ""}`} onClick={() => setSelected("MyTrips")}>
          <div className="item-content">
            <LuMap className="nav-icon" />
              <span>My Trips</span>
          </div>
          {selected === "MyTrips" && <span className="active-dot"></span>}
        </button>
      </div>
      </div>

    <div className='logout'>
      <button>
        <LuLogOut/>
        <span>Log out</span>
      </button>

    </div>

    </div>
  )
}

export default ProfileAside
