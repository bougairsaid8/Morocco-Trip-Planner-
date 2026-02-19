import React,{useState} from 'react'
import "./Profile.css";
import ProfileAside from '../../components/profileAside/ProfileAside';
import MainContent from '../../components/mainContent/MainContent';

function Profile() {
  const [selected,setSelected]=useState("personalInfo")
  return (
    <div className='profileWrapper'>

      <aside className='ProfileAside'>
          <ProfileAside selected={selected} setSelected={setSelected}/>
      </aside>

      <main className='mainContent'>
        <MainContent selected={selected} setSelected={setSelected}/>
      </main>
      
    </div>
  )
}

export default Profile
