import React from 'react';
import {Link} from "react-router-dom";
import "./Navbar.css"
import { useState } from 'react';
import { LuMenu, LuX } from "react-icons/lu";


function Navbar() {

const [isOpen, setIsOpen] = useState(false);



  return (
    <div className='Header'>

      <p className='logo'>Morocco Trip Planner</p>

      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <LuX /> : <LuMenu />}
      </div>

      <div className={`nav-wrapper ${isOpen ? 'open' : ''}`}>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/explorer">Explorer</Link>
        </nav>

        <div className='Navbuttons'>
            <Link to="/login"><button className='btn'>Login</button></Link>
            <Link to="/signup"><button className='btn'>Sign in</button></Link>
        </div>
    </div>
    </div>
  )
}

export default Navbar
