import React from "react";
import "./Timeline.css";

export default function Timeline({ days = [], currency = "MAD", onSelectPlace }) {
 

  return (
    <main className="tl-wrap">
      <div className="tl-top">
        <div>
          <h3>Your Itinerary</h3>
          <p>Click a place to preview it</p>
        </div>
      </div>

      {/* SCROLL CONTAINER */}
      <div className="tl-itinerary">
        {days.map((day, index) => {
          const items = day.items || [];

          return (
            <section key={day.id} className="tl-day">
              <div className="tl-right">
                
                {/* DAY HEADER */}
                <div
                  className="tl-head"
                >
                  <div>
                    <h4 className="tl-title">
                      {day.title || `Day ${index + 1}`}
                    </h4>
                    {day.date && <p className="tl-date">{day.date}</p>}
                  </div>
                </div>

                {/* DAY PLACES (ALWAYS VISIBLE) */}
                <div className="tl-places">
                  {items.map((act) => (
                    <div
                      key={act.id}
                      className="tl-place"
                      onClick={() => onSelectPlace(act)}
                    >
                      <div
                        className="tl-img"
                        style={{
                          backgroundImage: `url(${act.image || ""})`,
                        }}
                      />

                      <div className="tl-body">
                        <h5 className="tl-name">{act.name}</h5>

                        {act.category && (
                          <span className="tl-tag">{act.category}</span>
                        )}

                        <div className="tl-meta">
                          {act.rating && (
                            <span>
                              ⭐ {act.rating}
                              {act.reviews ? ` (${act.reviews})` : ""}
                            </span>
                          )}

                          {act.freeEntry && <span>• Free Entry</span>}
                          {act.price != null && (
                            <span>• {act.price} {currency}</span>
                          )}
                        </div>

                        <div className="tl-foot">
                          {act.time && (
                            <span className="tl-pill">{act.time}</span>
                          )}
                          {act.duration && (
                            <span className="tl-pill">{act.duration}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                 
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
