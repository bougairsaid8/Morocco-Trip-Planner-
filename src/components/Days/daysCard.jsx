import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import "./daysCard.css";

const DayCard = () => {
  const [days, setDays] = useState([
    { 
      id: 1, 
      label: "Day 1", 
      activities: [
        { id: 101, name: "Riad Breakfast", time: "08:30 AM", price: 25 },
        { id: 102, name: "Jardin Majorelle", time: "11:00 AM", price: 15 }
      ] 
    },
    { id: 2, label: "Day 2", activities: [] }, // نهار خاوي للتجربة
    { id: 3, label: "Day 3", activities: [] },
  ]);

  const [activeDayId, setActiveDayId] = useState(null);

  const clearActivities = (id) => {
    setDays(days.map(d => d.id === id ? { ...d, activities: [] } : d));
  };

  const removeDay = (id) => {
    setDays(days.filter(d => d.id !== id));
  };

  return (
    <div className="daysCard">
      {days.map((item) => {
        const isActive = activeDayId === item.id;
        const hasActivities = item.activities && item.activities.length > 0;

        return (
          <div key={item.id} className={`day ${isActive ? 'active' : ''}`}>
            <div className="day-main-content" onClick={() => setActiveDayId(isActive ? null : item.id)}>
              <div className="leftS">
                <div className={`dayId ${isActive ? 'active' : ''}`}><span>{item.id}</span></div>
                <div className="labelInfos">
                  <h3>{item.label}</h3>
                  <p><span>{item.activities.length}</span> places</p>
                </div>
              </div>
              <div className="rightS">
                <div className="budget"><p><span>{item.id * 20}</span> $</p></div>
                <LuChevronDown className={`arrow-icon ${isActive ? 'rotate' : ''}`} />
              </div>
            </div>

            {isActive && (
              <div className="day-details">
                {item.activities.map(act => (
                  <div key={act.id} className="activity-item">
                    <div className="imga"></div>
                    <div className="text">
                      <div className="t">
                        <h4>{act.name}</h4>

     
                        </div>
                       <div className="izdar">
                          <p>{act.time}</p>


                       </div>
                      
                    </div>
                  </div>
                ))}

                {/* 🎯 4. اللوجيك ديال البوطونة اللي بغيتي */}
                <div className="day-actions">
                  {hasActivities ? (
                    <button className="clear-btn" onClick={() => clearActivities(item.id)}>
                       Clear All Activities
                    </button>
                  ) : (
                    <button className="remove-btn" onClick={() => removeDay(item.id)}>
                       Remove This Day
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DayCard;