import React,{useState} from 'react'
import "./DataPlanner.css";
import { AiFillStar } from "react-icons/ai";


function DataPlanner() {
  const [type,setType]=useState("All");
  const data=[
    {id:1,rev:4.8,type:"hotel",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
    {id:2,rev:4.8,type:"Resturants",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
    {id:3,rev:4.8,type:"hotel",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
    {id:4,rev:4.8,type:"Activities",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
    {id:5,rev:4.8,type:"Resturants",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
    {id:6,rev:4.8,type:"hotel",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
    {id:7,rev:4.8,type:"Activities",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
    {id:8,rev:4.8,type:"hotel",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
    {id:9,rev:4.8,type:"hotel",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
    {id:10,rev:4.8,type:"Resturants",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
    {id:11,rev:4.8,type:"hotel",name:"the View" ,adresse:"agadir tama lb7er",prix:"100DH"},
  ]
  const filteredData = data.filter((item) => {
    if (type === "All") return true; 
    
  
    if (type === "Hotels") return item.type === "hotel"; 
    
    return item.type === type; 
  });
  return (
    <div className='dataPlanner'>

      <div className='tripInfos'>
        <h3>Day 3 : AGADIR</h3>
        <p>Discover the magic of AGADIR .Select activities to build your itinerary</p>
      </div>

      <div className='types'>
        <button className={type=="All" ? "active" :""} onClick={()=>setType("All")}>All</button>
        <button className={type=="Hotels" ? "active" :""}  onClick={()=>setType("Hotels")}>Hotels</button>
        <button className={type=="Resturants" ? "active" :""}  onClick={()=>setType("Resturants")}>Resturants</button>
        <button className={type=="Activities" ? "active" :""}  onClick={()=>setType("Activities")}>Activities</button>

      </div>

      <div className='line'></div>

      <div className='dataCards'>
        {filteredData.map((item)=>{
          return (
            <div key={item.id} className='dataCard'>
              <div className='image'>

              </div>
              <span className='type'>{item.type}</span>
              <div className='review'>
                <div className='star' ><AiFillStar /> </div>
                <div className='ra9m'>{item.rev} </div>
              </div>
              <div className='dataInfos'>
                <h3 className='nomee'>{item.name}</h3>
                <p>{item.adresse}</p>
                <div className='footerInfos'>
                  <h3 className='pri'>{item.prix} / night</h3>
                  <button >Add to trip</button>
                </div>
              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default DataPlanner
