import React,{useState} from 'react';
import Days from "../../components/Days/Days"
import "./Planner.css";
import DataPlanner from '../../components/dataPlanner/dataPlanner';
import DetailsSection from '../../components/detailsSection/DetailsSection';

function Planner() {
 const [selectedItem, setSelectedItem] = useState(true);

  return (
    // Planner.jsx
<div className="planner-wrapper">
  <div className={`main-layout ${selectedItem ? 'blur-effect' : ''}`}>
    <div className='days-overlay'>
        <Days />
    </div>
    
    <div className='planner-content'>
        <DataPlanner />
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
