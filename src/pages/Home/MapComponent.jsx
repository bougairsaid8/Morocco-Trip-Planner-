import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LuMapPin, LuArrowRight } from "react-icons/lu";
import { useState,useEffect } from 'react';
import "./Home.css"
import { useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const MapComponent = ({setCityName}) => {
  

  const [position,setPosition]=useState([31.7917, -7.0926])
  const navigate=useNavigate()

  const Cities=[
      {city:"Agadir",position:[30.4278, -9.5981]},
      {city:"Casablanca",position:[33.5731, -7.5898]},
      {city:"Marakech",position:[31.6295, -7.9811]},
      {city:"Tanger",position:[35.7595, -5.8340]},

  ];
  const handleCityChange=(e)=>{
    const selectedCity=Cities.find((item)=>item.city === e.target.value);
    if (selectedCity){
      setPosition(selectedCity.position);
      setCityName(selectedCity.city);
      
    }
  }

 

  return (
    <div className='map-wrapper' style={{ height: "90vh", width: "100%", overflow: "hidden" }}>
      <MapContainer center={position} zoomControl={false} zoom={5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ChangeView center={position} />

        <Marker position={position}>
          <Popup>
            مرحباً بك في المغرب! <br /> ابدأ التخطيط لرحلتك.
          </Popup>
        </Marker>
      </MapContainer>

      <div className="map-gradient-overlay"></div>

      <div className="planning-card">
        <h2>Plan your trip across Morocco</h2>
        <p>Select a city and start building your bespoke itinerary instantly.</p>
        <div className="input-group">
          <LuMapPin className="icon" />
          <select onChange={handleCityChange}>
              {Cities.map((item)=>{
                return (
                  <option key={item.city} value={item.city}> {item.city} </option>
                )
              })}
          </select>
        </div>
        <button className="btn-start" onClick={()=>navigate("/login")}>
        Start Planning <LuArrowRight />
        </button>
    </div>

    </div>
  );
};

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 9, {
        duration: 1.5
      });
    }
  }, [center, map]); 
  return null;
}
export default MapComponent;