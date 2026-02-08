import React from 'react'
import "./Home.css";
import MapComponent from './MapComponent';
import { IoWallet,IoSearchOutline, IoListOutline, IoMapOutline } from "react-icons/io5";
import { BiGlobe } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi2";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSearch, LuArrowRight } from "react-icons/lu";

function Home() {
  const workflow = [
    { icon: <IoSearchOutline />, title: "1. Choose a city", desc: "Select your starting point from our curated list of destinations." },
    { icon: <IoListOutline />, title: "2. Build Itinerary", desc: "Drag and drop activities to craft your perfect day-by-day plan." },
    { icon: <IoMapOutline />, title: "3. Visualize Map", desc: "See your entire route plotted instantly on an interactive map." },
  ]
  const uses = [
    { icon: <BiGlobe />,colorClass:"icon-orange", title: "Interactive Map", desc: "Don't just list places. See exactly where they are relative to your riad or hotel." },
    { icon: <HiSparkles />,colorClass:"icon-blue", title: "Smart Planner", desc: "Automatically groups nearby attractions to save you travel time between stops." },
    { icon: <IoWallet />, colorClass:"icon-green",title: "Budget Control", desc: "Track expenses in Moroccan Dirham (MAD) and see where your money is going." },
  ]

  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (cityName.trim() !== "") {
      navigate('/login');
    }}

  return (
    <div className='Home'>
      <MapComponent setCityName={setCityName}/>

      <section className='workflowSection'>
        <h1 className='workflowTitle'>WORKFLOW</h1>
        <div className='workflowContainer'>
          {workflow.map((item) => (
            <div className='workflowCard' key={item.title}>
              <div className='iconWrapper'>
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='uses'> 
        <h1 className='usesTitle'>WHY USE THIS?</h1>
        <div className='usesContainer'>
          {uses.map((item) => (
            <div className='usesCard' key={item.title}>
              <div className={`usesIcon ${item.colorClass}`}>
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </section>

      <section className="ctaSection">
        <div className="ctaContainer">
        <h2>Ready to explore?</h2>
        
        <div className="ctaInputWrapper">
          <LuSearch className="searchIcon" />
          <input 
            type="text" 
            placeholder="Where do you want to go? " 
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleStart()} 
          />
          <button className="ctaInsideBtn" onClick={handleStart}>
            Go <LuArrowRight />
          </button>
        </div>
      </div>
    </section>

    <div className="bottom-glow-ellipse"></div>
    </div>
    
  )
}

export default Home