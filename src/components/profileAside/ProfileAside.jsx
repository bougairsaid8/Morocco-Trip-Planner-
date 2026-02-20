import React from 'react';
import "./ProfileAside.css";
import { LuUser, LuShieldCheck, LuLogOut } from "react-icons/lu";
import {logout} from '../../reduxStructure/slices/authSlice'
import { useDispatch } from 'react-redux';

function ProfileAside({selected,setSelected}) {
  const dispatch=useDispatch()
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
      </div>

    <div className='logout'>
      <button onClick={()=>dispatch(logout())}>
        <LuLogOut/>
        <span>Log out</span>
      </button>

    </div>

    </div>
  )
}

export default ProfileAside
