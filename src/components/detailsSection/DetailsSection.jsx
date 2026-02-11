import React,{useState} from 'react';
import "./DetailsSection.css";
import { AiOutlineClose } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function DetailsSection({onClose}) {
  const [activeTab, setActiveTab] = useState("Overview");

  const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // تقدّر دير أيقونة Cyan بحال Figma
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});
  return (
   <div className="details-panel open">

      <div className='detailsHeader'>

        <div className='detailsImg'>

          <span  onClick={()=>onClose()} className='closebtn'><AiOutlineClose/></span>

          <div className='diinfos'>
            <h3>Jemaa el-Fanaa Market</h3>
            <p><span><IoLocationSharp/></span> Medina Quarter , Marrakech</p>

          </div>
        </div>
      
      </div>

      <div className="place-metrics">
        <div className="metric-item">
          <div className="rating-row">
            <span className="score">4.9</span>
           <div className="stars">⭐⭐⭐⭐⭐</div>
          </div>
          <p className="sub-text">1,248 reviews</p>
        </div>

        <div className="metric-item divider">
          <span className="value">Free</span>
          <p className="sub-text">Entry Price</p>
        </div>

        <div className="metric-item">
          <span className="value">2-3h</span>
          <p className="sub-text">Duration</p>
        </div>
      </div>

      <div className="tabs-nav">
        {["Overview", "Location", "Reviews"].map((tab) => (
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
              <p> "A bustling square and market place in Marrakesh..." Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, consectetur! Laudantium aut sed, molestias eaque aliquam laboriosam. Aut, quia optio dolor iste, illum, iusto corrupti reiciendis enim vitae magnam sapiente.</p>
          </div>
        )}

        {activeTab === "Location" && (
          <div className="location-info">
            <div className="location-header">
              <h3>Location</h3>
              <a href="#" className="view-larger">View larger map</a>
            </div>

            <div className="map-placeholder">
              <MapContainer 
                  center={[31.6258, -7.9891]} // إحداثيات جامع الفنا
                  zoom={15} 
                  scrollWheelZoom={false}
                  zoomControl={false}
                  style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'/>

                <Marker position={[31.6258, -7.9891]} icon={customIcon}>
                  <Popup>Jemaa el-Fnaa Market</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>)}

        {activeTab === "Reviews" && (
          <div className="reviews-list">
             <h3>User Reviews</h3>
             <p>⭐⭐⭐⭐⭐ (1,248 reviews)</p>
          </div>
        )}
      </div>
      <button className="add-to-plan-btn">Add to Trip Plan</button>

    </div>
    )
}

export default DetailsSection
