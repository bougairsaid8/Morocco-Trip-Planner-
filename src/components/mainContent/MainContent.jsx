import React from 'react'
import "./MainContent.css";
import PersonalInfo from "./PersonalInfo";
import Security from "./Security";

function MainContent({selected}) {
  return (
    <div className='mainc'>
        {selected === "personalInfo" && <PersonalInfo />}
        
        {selected === "Security" && <Security />}
        
      
    </div>
  )
}

export default MainContent
