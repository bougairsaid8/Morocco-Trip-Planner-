import React,{useState} from 'react'
import "./MainContent.css";
import PersonalInfo from "./PersonalInfo";
import Security from "./Security";
import MyTrips from "./MyTrips"

function MainContent({selected}) {
  return (
    <div className='mainc'>
        {selected === "personalInfo" && <PersonalInfo />}
        
        {selected === "Security" && <Security />}
        
        {selected === "MyTrips" && <MyTrips />}
      
    </div>
  )
}

export default MainContent
