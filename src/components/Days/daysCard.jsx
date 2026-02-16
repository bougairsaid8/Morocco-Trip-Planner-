import React from "react";
import { MdDeleteSweep } from "react-icons/md";

import "./daysCard.css";
import { useSelector ,useDispatch} from "react-redux";

// 
import {  selectPlanner } from "../../reduxStructure/selectors";
import {selectDay,deleteDay,removeItem} from "../../reduxStructure/slices/plannerSlice";

const DayCard = () => {

  const selectedDay = useSelector(selectPlanner).selectedDayId;
  const days = useSelector(selectPlanner).days;
  const dispatch = useDispatch();
  const selectedDayItems = days.find(day => day.id === selectedDay)?.items;
 
  return (
    <div className="daysCard">
       {days.map((item,index) => {
          const isActive = selectedDay === item.id;

        return (
          <div key={item.id} className={`day ${isActive ? 'active' : ''}`}>
            <div className="day-main-content" onClick={() => dispatch(selectDay(item.id))}>
              <div className="leftS">
                <div className={`dayId ${isActive ? 'active' : ''}`}><span>{index+1}</span></div>
                <div className="labelInfos">
                  <h3>Day {index+1}</h3>
                  <p><span>{item.items.length}</span> places</p>
                </div>
              </div>
              <div className="rightS">
                <div className="budget">
                  <p>
                    {item.items.reduce((sum, i) => sum + (i.price || 0), 0).toFixed(2)} MAD
                  </p>
                  </div>
                <span onClick={()=>dispatch(deleteDay(item.id))}><MdDeleteSweep /></span>
              </div>
            </div>

             {(isActive) && (
              <div className="day-details">
                {selectedDayItems?.map(act => (
                  <div key={act.id} className="activity-item">
                    <div className="imga" style={{backgroundImage:`url(${act.image})`}}></div>
                    <div className="text">
                        <h4>{act.name}</h4>
                        <p>{act.price} MAD</p>
                    </div>
                    <MdDeleteSweep onClick={()=>dispatch(removeItem({ dayId:item.id, itemId:act.id }))}/>
                  </div>
                ))}
                 {selectedDayItems.length==0 && (<p className="day_empty">Let’s add something to this day</p>)}

              
              </div>
            )}
           
          </div>
        );
      })}
    </div>
  );
};

export default DayCard;
