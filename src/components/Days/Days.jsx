import React from 'react'
import DayCard from "./daysCard.jsx";
import "./Days.css"

function Days() {
  return (
    <section className='daysSection' >

      <div className='header'>
        <h3>Your ltienrary</h3>
        <p>Oct 12-Oct 16</p>
      </div>

      

     <div className='main'>
        <DayCard/>
      </div>

      <div className='footer'>

        <div className='budget'>
          <h3>Estimated Budget</h3>
          <p>350 $</p>
        </div>
        <div className='confirmTrip'>
          
          <button>Export ltienrary</button>

        </div>

      </div>

    </section>
  )
}

export default Days
