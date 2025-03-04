// import React, { useState } from "react";
// import "../Styles/NewCards.css";

// const NewCards = () => {
//   return (
//     <div className="cards-container">
//       <div className="card">
//         <div className="card_options">
//           <h2>One Card</h2>
//         </div>
//         <div className="card_options">
//           <h2>Two Card</h2>
//         </div>
//         <div className="card_options">
//           <h2>Three Card</h2>
//         </div>
//         <div className="card_options">
//           <h2>Five Card</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewCards;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../Styles/NewCards.css";

// const NewCards = () => {
//   const navigate = useNavigate();

//   const handleCardClick = (route) => {
//     navigate(route);
//   };

//   return (
//     <div className="cards-container">
//       <div className="card">
//         <div
//           className="card_options"
//           onClick={() => handleCardClick("/one-card")}
//         >
//           <h2>One Card</h2>
//         </div>
//         <div
//           className="card_options"
//           onClick={() => handleCardClick("/two-cards")}
//         >
//           <h2>Two Card</h2>
//         </div>
//         <div
//           className="card_options"
//           onClick={() => handleCardClick("/three-cards")}
//         >
//           <h2>Three Card</h2>
//         </div>
//         <div
//           className="card_options"
//           onClick={() => handleCardClick("/five-cards")}
//         >
//           <h2>Five Card</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewCards;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Styles/NewCards.css";

// const NewCards = () => {
//   const navigate = useNavigate();
//   const [exitAnimation, setExitAnimation] = useState(false);

//   const handleCardClick = (route) => {
//     setExitAnimation(true);
//     setTimeout(() => {
//       navigate(route);
//     }, 700); // Delay matches animation duration
//   };

//   return (
//     <div className="cards-container">
//       <div className={`card ${exitAnimation ? "exit-animation" : ""}`}>
//         <div
//           className="card_options"
//           onClick={() => handleCardClick("/one-card")}
//         >
//           <h2>One Card</h2>
//         </div>
//         <div
//           className="card_options"
//           onClick={() => handleCardClick("/two-card")}
//         >
//           <h2>Two Card</h2>
//         </div>
//         <div
//           className="card_options"
//           onClick={() => handleCardClick("/three-card")}
//         >
//           <h2>Three Card</h2>
//         </div>
//         <div
//           className="card_options"
//           onClick={() => handleCardClick("/five-card")}
//         >
//           <h2>Five Card</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewCards;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/NewCards.css";

const NewCards = () => {
  const navigate = useNavigate();
  const [exitAnimation, setExitAnimation] = useState(false);

  const handleCardClick = (route) => {
    setExitAnimation(true); // Start exit animation

    setTimeout(() => {
      navigate(route); // Navigate after animation completes
    }, 800); // Matches animation duration
  };

  return (
    <div className="options-container">
      <div className="options">
        <div
          className={`card_options ${exitAnimation ? "slide-up" : ""}`}
          onClick={() => handleCardClick("/one-card")}
        >
          <h2>One Card</h2>
        </div>
        <div
          className={`card_options ${exitAnimation ? "slide-up" : ""}`}
          onClick={() => handleCardClick("/two-card")}
        >
          <h2>Two Card</h2>
        </div>
        <div
          className={`card_options ${exitAnimation ? "slide-up" : ""}`}
          onClick={() => handleCardClick("/three-card")}
        >
          <h2>Three Card</h2>
        </div>
        <div
          className={`card_options ${exitAnimation ? "slide-up" : ""}`}
          onClick={() => handleCardClick("/five-card")}
        >
          <h2>Five Card</h2>
        </div>
      </div>
    </div>
  );
};

export default NewCards;
