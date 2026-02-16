import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LuMapPin, LuArrowRight } from "react-icons/lu";
import { useState,useEffect } from 'react';
import "./Home.css"
import { useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';



const MapComponent = () => {
  

  const [position,setPosition]=useState([31.7917, -7.0926])
  const [city,setCity]=useState("Agadir")
  const navigate=useNavigate()

  
  const Cities = [
  { city: "Agadir", position: [30.4278, -9.5981] },
  { city: "Casablanca", position: [33.5731, -7.5898] },
  { city: "Marrakech", position: [31.6295, -7.9811] },
  { city: "Tangier", position: [35.7595, -5.8340] },

  { city: "Rabat", position: [34.0209, -6.8416] },
  { city: "Fes", position: [34.0331, -5.0003] },
  { city: "Meknes", position: [33.8730, -5.5407] },
  { city: "Tetouan", position: [35.5785, -5.3684] },
  { city: "Chefchaouen", position: [35.1688, -5.2636] },
  { city: "Essaouira", position: [31.5085, -9.7595] },
  { city: "Safi", position: [32.2994, -9.2372] },
  { city: "Nador", position: [35.1681, -2.9335] },
  { city: "Dakhla", position: [23.6848, -15.9570] },
  { city: "Laayoune", position: [27.1536, -13.2033] },
  { city: "Ouarzazate", position: [30.9335, -6.9370] },
];

  const handleCityChange=(e)=>{
    const selectedCity=Cities.find((item)=>item.city === e.target.value);
    if (selectedCity){
      setPosition(selectedCity.position);
      setCity(selectedCity.city);
    }
  }

 

  return (
    <div className='map-wrapper' style={{ height: "90vh", width: "100%", overflow: "hidden" }}>
      <MapContainer center={position} zoomControl={false} zoom={5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeView center={position} />

        <Marker position={position}>
          <Popup>
           Welcome to Morocco!<br /> Start planning your trip.
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
        <button className="btn-start" onClick={()=>navigate(`/planner/${city}`)}>
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