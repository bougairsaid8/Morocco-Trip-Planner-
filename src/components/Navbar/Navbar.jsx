import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector ,useDispatch} from 'react-redux'; 
import "./Navbar.css";
import { LuMenu, LuX, LuLogOut } from "react-icons/lu";
import { selectIsAuthenticated } from '../../reduxStructure/selectors';
import img from '../../assets/profile/oussama.jpg'

import {logout} from '../../reduxStructure/slices/authSlice'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user);

  const username = user?.username || "";
  const handleLogout = () => {
      dispatch(logout())
  };

  return (
    <div className='Header'>
      <p className='logo'>Morocco Trip Planner</p>

      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <LuX /> : <LuMenu />}
      </div>

      <div className={`nav-wrapper ${isOpen ? 'open' : ''}`}>
        <nav>
          <Link className='a' to="/">Home</Link>
          <Link className='a' to="/about">About</Link>
          
          {/* 🎯 إيلا كان مـسجل، نـزيدو هاد الـ روابط */}
          {isAuthenticated && (
            <>
              <Link className='a' to="/my-trips">My Trips</Link>
            </>
          )}
        </nav>

        <div className='Navbuttons'>
          {isAuthenticated ? (
            /* 👤 حالة الـ مستخدم الـ مـسجل (User Profile) */
            <div className="user-profile">
              <Link  to="/profile" className="user-info">
                <div alt="Avatar" className="avatar" style={{backgroundImage:`url(${img})`}} />
                <span className="user-name">{username}</span>
              </Link>
              <button className='logout-btn' onClick={handleLogout}>
                <LuLogOut /> <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login"><button className='btn'>Login</button></Link>
              <Link to="/signup"><button className='btn signin'>Sign in</button></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;