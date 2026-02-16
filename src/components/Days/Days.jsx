import React from 'react'
import DayCard from "./daysCard.jsx";
import "./Days.css"
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';

import {addDay} from '../../reduxStructure/slices/plannerSlice.jsx'
import {selectTripTotal} from '../../reduxStructure/selectors.jsx'
function Days({setNameTrip}) {

  const dispatch = useDispatch()
  const total=useSelector(selectTripTotal)
  return (
    <section className='daysSection' >

      <div className='header'>
        <div>
          <h3>Your ltienrary</h3>
          <p>Oct 12-Oct 16</p>
        </div>
        <button onClick={()=>dispatch(addDay())}>
          <FaPlus />New Day
        </button>
      </div>

      

     <div className='main'>
        <DayCard/>
      </div>

      <div className='footer'>

        <div className='budget'>
          <h3>Estimated Budget</h3>
          <p>{total.toFixed(2)} $</p>
        </div>
        <div className='confirmTrip'>
          
          <button onClick={()=>setNameTrip(true)}>Export ltienrary</button>

        </div>

      </div>

    </section>
  )
}

export default Days
