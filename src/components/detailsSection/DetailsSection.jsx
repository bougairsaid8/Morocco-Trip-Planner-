import React,{useState} from 'react';
import "./DetailsSection.css";
import { AiOutlineClose ,AiFillStar} from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector ,useDispatch} from 'react-redux';
import {addItemToSelectedDay} from '../../reduxStructure/slices/plannerSlice'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function DetailsSection({onClose, item}) {
  console.log(item)
  const [activeTab, setActiveTab] = useState("Overview");
  const Data=useSelector(state => state.cityData.allData).find(obj=>obj.id === item.id)
  console.log('obj',Data)
  const dispatch=useDispatch()



  const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});
  return (
   <div className="details-panel open">

      <div className='detailsHeader'>

        <div className='detailsImg' style={{backgroundImage:`url(${Data.image})`}}>

          <span  onClick={()=>onClose()} className='closebtn'><AiOutlineClose/></span>

          <div className='diinfos'>
            <h3>{Data.name}</h3>
            <p><span><IoLocationSharp/></span> {Data.address}</p>

          </div>
        </div>
      
      </div>

      <div className="place-metrics">
        <div className="metric-item">
          <div className="rating-row">
            <div className="stars"><AiFillStar /></div>
            <span className="score">{Data.rating}</span>
           
          </div>
          <p className="sub-text">{Data.reviews} reviews</p>
        </div>

        <div className="metric-item divider">
          <span className="value">{Data.price?Data.price:"Free"}</span>
          <p className="sub-text">Entry Price</p>
        </div>

        
      </div>

      <div className="tabs-nav">
        {["Overview", "Location"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Overview" && (
          <div className="about-place">
              <h3>About this place</h3>
              <p> {Data.description}</p>
          </div>
        )}

        {activeTab === "Location" && (
          <div className="location-info">
            <div className="location-header">
              <h3>Location</h3>
              <a href={`https://www.google.com/maps/search/?api=1&query=${Data.lat},${Data.lng}(${encodeURIComponent(Data.name || "")})`}
                 target="_blank"
                 className="view-larger"
                 >View larger map</a>
            </div>

            <div className="map-placeholder">
              <MapContainer 
                  center={[Data.lat, Data.lng]} 
                  zoom={15} 
                  scrollWheelZoom={false}
                  zoomControl={false}
                  style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'/>

                <Marker position={[Data.lat, Data.lng]} icon={customIcon}>
                  <Popup>Jemaa el-Fnaa Market</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>)}


      </div>
      <div className='containerBtn'>
        <button className="add-to-plan-btn" onClick={()=>dispatch(addItemToSelectedDay(Data))}>Add to Trip Plan</button>
      </div>
    </div>
    )
}

export default DetailsSection
