import React ,{useEffect}from "react";
import "./About.css";
import image_said from "../../assets/profile/saidbougair.png";
import image_oussama from "../../assets/profile/oussama.jpg";
import { FaGithubSquare ,FaLinkedin ,FaInstagramSquare ,FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function About() {
const navigate=useNavigate()
useEffect(() => {
  const numbers = document.querySelectorAll(".Number");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("showNumber");
      }
    });
  });

  numbers.forEach((n) => observer.observe(n));
}, []);



  return (
    <div className="about">

      {/* HERO */}
      <section className="hero">
        <div className="hero-box">
          <h1>
            We make Morocco <span>accessible to everyone.</span>
          </h1>

          <p>
            Morocco Trip Planner helps you build itineraries,
            explore cities, and plan smarter journeys.
          </p>

          <div className="buttons">
            <button className="btnAbout start" onClick={()=>navigate('/')}>Start Planning</button>
            <button className="btnAbout">View Gallery</button>
          </div>
        </div>
      </section>

      {/* PROJECT */}
      <section className="project">
        <h2 className="title_project">What is this project?</h2>
        <p className="des_project">
         Morocco Trip Planner is an intelligent travel companion designed to simplify the complexities of exploring North Africa.
         From building day-by-day plans to visualizing routes on an interactive map,
         we provide a smooth experience that helps travelers save time and discover hidden hidden gems.

        </p>
      </section>

      {/* statestique */}
      {/*   */}
      <section className="stats">
        <div className="title_stat">
          <h2>Our Stats</h2>
          <p>Helping you plan smarter trips and discover hidden gems across Morocco.</p>
        </div>
        <div className="stat">
          <h3 className="Number">1000+</h3>
          <p>Happy Travelers</p>
        </div>
        <div className="stat">
          <h3 className="Number">80+</h3>
          <p>Destinations Covered</p>
        </div>
        <div className="stat">
          <h3 className="Number">100+</h3>
          <p>Trips Planned</p>
        </div>
      </section>

      {/* TEAM */}
      <section className="team">
        <p className="title_team">WE ARE CREATIVE</p>
        <h2 className="title_team2">Meet the Team</h2>

        <div className="about_cards">
          <div className="about_card">
            <img src={image_said} alt="Said Bougair" />
            <h3 className="card-name">Said Bougair</h3>
            <p className="card-role">Full Stack Developer</p>
            <p className="card-description">Builds modern web applications with a focus on performance, design, and user experience.</p>
            <div className="card-social">
             <a href='https://github.com/bougairsaid8' target="_blank" rel="noopener noreferrer"> <FaGithubSquare /></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a>
               <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>

          <div className="about_card">
            <img src={image_oussama} alt="Oussama Janal" />
            <h3 className="card-name">oussama janal</h3>
            <p className="card-role">Full Stack Developer</p>
            <p className="card-description">Builds modern web applications with a focus on performance, design, and user experience.</p>
            <div className="card-social">
                <a href='https://github.com/oussama-janal' target="_blank" rel="noopener noreferrer"> <FaGithubSquare /></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a>
               <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>

          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready for your next adventure?</h2>
        <p>Plan your journey and experience Morocco like never before.</p>

        <div className="about_buttons">
          <button className="btnAbout main" onClick={()=>navigate('/')}> <FaPaperPlane className="icon" /> Start Planning</button>
        </div>
      </section>

    </div>
  );
}

