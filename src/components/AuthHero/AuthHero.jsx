import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt ,FaQuoteRight,FaQuoteLeft} from "react-icons/fa";
import './AuthHero.css';
import MARRAKECH from '../../assets/MARRAKECH.jpg';
import CHEFCHAOUEN from '../../assets/CHEFCHAOUEN.jpg';
import MERZOUGA from '../../assets/MERZOUGA.jpg';
import ESSAOUIRA from '../../assets/ESSAOUIRA.jpg';

const slides = [
  { city: "MARRAKECH, MOROCCO", quote: "Every journey begins with a single step. Plan yours today.", image: MARRAKECH },
  { city: "CHEFCHAOUEN, MOROCCO", quote: "Discover the magic of the blue pearl in the Rif mountains.", image: CHEFCHAOUEN },
  { city: "MERZOUGA, MOROCCO", quote: "A night under the stars in the heart of the golden dunes.", image: MERZOUGA },
  { city: "ESSAOUIRA, MOROCCO", quote: "Where the Atlantic breeze meets centuries of history.", image: ESSAOUIRA }
];

const AuthHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="auth-hero-side">
      {/* استبدال background-image بـ img tags لسرعة التحميل */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt={slide.city}
          /* أول صورة كنعطيوها أولوية عالية جداً */
          fetchpriority={index === 0 ? "high" : "low"}
          loading="eager"
          className={`hero-img-layer ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
      
      {/* طبقة الظل (Overlay) */}
      <div className="hero-dark-overlay"></div>

      <div className="hero-overlay-content">
        <div className="city-badge fade-in-text" key={`city-${currentIndex}`}>
          <FaMapMarkerAlt className="pin-icon-city" /> {slides[currentIndex].city}
        </div>
        <h1 className="hero-quote-text fade-in-text" key={`quote-${currentIndex}`}>
          <FaQuoteLeft className="quote-icon-left" /> 
          <span className="quote-content">{slides[currentIndex].quote}</span>
          <FaQuoteRight className="quote-icon-right" />
        </h1>
        <div className="hero-pagination">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`pagination-dot ${index === currentIndex ? 'active-dot' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthHero;