import React, { useState, useEffect } from "react";
import "../Styles/TwoCards.css";

const TwoCards = () => {
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
      <h1>Two Card Page</h1>
    </div>
  );
};

export default TwoCards;
