import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTrip } from "../../reduxStructure/slices/savedTripsSlice";
import { selectTripTotal, selectCity, selectPlanner } from "../../reduxStructure/selectors.jsx";
import { MdAddLocationAlt } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import { useNavigate } from "react-router-dom"; 
import "./AddTripName.css";

function AddTripName({ setNameTrip }) {
  const [tripName, setTripName] = useState("");
  const [message, setMessage] = useState(false);

  const total = useSelector(selectTripTotal);
  const nameCity = useSelector(selectCity);
  const planner = useSelector(selectPlanner);

  const [cityImage, setCityImage] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  useEffect(()=>{
    async function run() {
      if (!nameCity) return;
      try {
          const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nameCity)}`
          );
          if (!res.ok) {
            throw new Error("Wikipedia request failed");
          }
          const data = await res.json();
          const image =data?.originalimage?.source || "";

          setCityImage(
            image ||
            "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
          );

        } catch (error) {
          console.error("Error fetching city image:", error);

          setCityImage(
            "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
          );
        }

    }
    run()
  },[nameCity])
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tripName.trim()) {
      alert("Please enter trip name");
      return;
    }

    dispatch(
      saveTrip({
        name: tripName,
        image:cityImage,
        city: nameCity,
        total: total,
        plannerSnapshot: planner,
      })
    );

    setTripName("");
    setMessage(true);
  };

  const goHome = () => {
    setNameTrip(false);      
    navigate("/");           
  };

  const goMyTrips = () => {
    setNameTrip(false);
    navigate("/my-trips");    
  };

  return (
    <div className="tripCardWrap">
      {!message ? (
        <div className="tripCard">
          <span className="closeIcon" onClick={() => setNameTrip(false)}>
            <IoMdCloseCircle />
          </span>

          <h3 className="tripCard__title">Save your trip</h3>
          <p className="tripCard__desc">
            Enter a name for this trip so you can access it later.
          </p>

          <form onSubmit={handleSubmit} className="tripCard__form">
            <div className="tripCard__inputRow">
              <span className="tripCard__prefix">
                <MdAddLocationAlt />
              </span>

              <input
                className="tripCard__input"
                type="text"
                placeholder="Enter trip name..."
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
              />
            </div>

            <button className="tripCard__btn" type="submit">
              Save Trip
            </button>
          </form>
        </div>
      ) : (
        <div className="tripCard next_step">

          <h3 className="tripCard__title"><IoCheckmarkDoneSharp/> Trip saved </h3>
          <p className="tripCard__desc">
            Where do you want to go next?
          </p>

          <div className="next_step__actions">
            <button className="btnGhost  active" onClick={goHome} >
              Go Home
            </button>

            <button className="btnGhost" onClick={goMyTrips}>
              My Trips
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTripName;
