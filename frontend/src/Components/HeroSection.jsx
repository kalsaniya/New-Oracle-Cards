import React from "react";
import "../Styles/HeroSection.css";

const HeroSection = () => {
  return (
    <>
      <section className="hero hero-content home-page">
        <div className="card-container">
          <div className="glow-effect"></div>
          <div className="the-card">
            <div className="the-card__front">
              <img
                src="https://tarotoo.com/wp-content/uploads/card-front-c-usual-625x1024.jpg-1.webp"
                alt="Tarot Card Front"
                className="card-image"
                decoding="async"
              />
            </div>
            <div className="the-card__back">
              <img
                src="https://tarotoo.com/wp-content/uploads/card-back-usual-625x1024.jpg-1.webp"
                alt="Tarot Card Back"
                className="card-image"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
