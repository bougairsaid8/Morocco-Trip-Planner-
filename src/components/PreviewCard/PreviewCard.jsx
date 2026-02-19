import React, { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./PreviewCard.css";

/* 🔹 Component كيحرّك الخريطة للمكان الجديد */
function FlyToPlace({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      map.flyTo([lat, lng], 15, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [lat, lng, map]);

  return null;
}

export default function PreviewCard({
  place,
  currency = "MAD",
  onOpenExplorer,
}) {
  if (!place) return null;

  const lat = Number(place.lat);
  const lng = Number(place.lng);
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);

  const customIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconSize: [20, 35],
  iconAnchor: [16, 32],
});


  return (
    <aside className="pc-shell">
      <div className="pc-card">
        {/* IMAGE */}
        <div
          className="pc-image"
          style={{ backgroundImage: `url(${place.image || ""})` }}
        />

        <div className="pc-content">
          {/* TITLE */}
          <div className="pc-title-row">
            <h3>{place.name}</h3>
          </div>

          {/* ADDRESS */}
          {place.address && (
            <p className="pc-address">
              <IoLocationSharp />
              {place.address}
            </p>
          )}

          {/* INFOS */}
          <div className="pc-infos">
            <div>
              <span className="label">ADMISSION</span>
              <strong>
                {place.price != null
                  ? `${place.price} ${currency}`
                  : "Free"}
              </strong>
            </div>

            {place.rating != null && (
              <div className="pc-rating">
                <AiFillStar />
                <span>{place.rating}</span>
              </div>
            )}
          </div>

          {/* MAP */}
          <div className="pc-map">
            <span>LOCATION PREVIEW</span>

            <div className="pc-map-box">
              {hasCoords ? (
                <MapContainer
                  center={[lat, lng]}
                  zoom={15}
                  scrollWheelZoom={false}
                  zoomControl={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />

                  {/* 🔥 تحريك الخريطة */}
                  <FlyToPlace lat={lat} lng={lng} />

                  <Marker position={[lat, lng]} icon={customIcon}>
                    <Popup>{place.name}</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="pc-map-fallback">
                  No location available
                </div>
              )}
            </div>
          </div>

          {/* BUTTON */}
          
          <a href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}(${encodeURIComponent(place.name || "")})`}
                 target="_blank">
          <button 
            className="pc-btn"
            onClick={() => onOpenExplorer?.(place)}
          >
            Open in Explorer
          </button>
          </a>
        </div>
      </div>
    </aside>
  );
}
