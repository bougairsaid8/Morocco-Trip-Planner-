import React,{useState} from 'react';
import Days from "../../components/Days/Days"
import "./Planner.css";
import DataPlanner from '../../components/dataPlanner/DataPlanner.jsx';
import DetailsSection from '../../components/detailsSection/DetailsSection.jsx';

import AddTripName from '../../components/AddTripName/AddTripName.jsx';

function Planner() {
 const [selectedItem, setSelectedItem] = useState(false);
 
// state for view model addTripName
 const [NameTrip,setNameTrip] = useState(false)
 
  return (
    // Planner.jsx
<div className="planner-wrapper">
    {/* we need view for user for add name trip */}
     {NameTrip &&(
      <div className='add_tripName' >
        <div className="add_tripName__card">
          <AddTripName setNameTrip={setNameTrip} />
        </div>
      </div>
    )}
    
  <div className={`main-layout ${selectedItem ? 'blur-effect' : ''}`}>
    <div className='days-overlay'>
        <Days setNameTrip={setNameTrip}/>
    </div>
    
    <div className='planner-content'>
        <DataPlanner  setSelectedItem={setSelectedItem} />
    </div>
  </div>

  {selectedItem && (
    <div className="details-overlay">
      <DetailsSection item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  )}
</div>
  );
}

export default Planner
