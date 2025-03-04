import React, { useState, useEffect } from "react";
import "../Styles/ThreeCards.css";
const ThreeCards = () => {
  const [enterAnimation, setEnterAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEnterAnimation(true); // Delay entry to match exit effect
    }, 300);
  }, []);

  return (
    <div
      className={`one-card-container ${
        enterAnimation ? "enter-animation" : ""
      }`}
    >
      <h1>Three Card Page</h1>
    </div>
  );
};

export default ThreeCards;
