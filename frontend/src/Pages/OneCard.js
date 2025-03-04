// import React, { useEffect, useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/effect-cards";
// import "swiper/css/pagination";

// import "../Styles/OneCard.css";
// import {
//   EffectCoverflow,
//   EffectCards,
//   Mousewheel,
//   Pagination,
// } from "swiper/modules";
// import shuffleSound from "../assets/shufflingCard.wav";
// import axios from "axios";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchOneCard } from "../redux/oneCardReducer/action";

// const OneCard = () => {
//   const [enterAnimation, setEnterAnimation] = useState(false);
//   const dispatch = useDispatch();

//   const [cardData, setCardData] = useState([]);
//   const [shuffledIndices, setShuffledIndices] = useState([]);
//   const [isShuffling, setIsShuffling] = useState(false);
//   const [isHighlighted, setIsHighlighted] = useState(false);
//   const [change, setChange] = useState(false);
//   const [arrayOfObjects, setArrayOfObjects] = useState([]);
//   const audioRef = useRef(null);

//   // ✅ Fix: Access the correct reducer key from combined reducers
//   const { data, loading, error } = useSelector(
//     (state) => state.oneCardReducer // Ensure this matches rootReducer's key
//   ) || { data: null, loading: false, error: null };

//   console.log("data", data);

//   // const shuffleCards = () => {
//   //   const shuffled = [...shuffledIndices];
//   //   for (let i = shuffled.length - 1; i > 0; i--) {
//   //     const j = Math.floor(Math.random() * (i + 1));
//   //     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   //   }

//   //   setIsShuffling(true);
//   //   setTimeout(() => {
//   //     setIsShuffling(false);
//   //     setShuffledIndices(shuffled);
//   //   }, 1000);

//   //   audioRef.current.play();
//   // };

//   const handleCardClick = (index) => {
//     const selectedCard = cardData[index];
//     if (!selectedCard) return;

//     const dataEntry = {
//       _id: selectedCard._id,
//       frontImage: selectedCard.frontImage,
//       backImage: selectedCard.backImage,
//       description: selectedCard.Description,
//       name: selectedCard.name,
//     };

//     setIsHighlighted(!isHighlighted);
//     setArrayOfObjects([dataEntry]);
//     localStorage.setItem("oneCard", JSON.stringify([dataEntry]));
//     // window.location.href = "/displaying-onecard";
//   };

//   useEffect(() => {
//     dispatch(fetchOneCard());

//     setTimeout(() => {
//       setEnterAnimation(true);
//     }, 300);
//   }, [dispatch]);

//   useEffect(() => {
//     if (data && Array.isArray(data)) {
//       setCardData(data);
//       setShuffledIndices(data.map((_, index) => index)); // Setting indices for shuffle
//     }
//   }, [data]);

//   return (
//     <div
//       className={`oneCard-container one-card-container  ${
//         enterAnimation ? "enter-animation" : ""
//       }`}
//     >
//       {/* {loading && <p>Loading...</p>}
//          {error && <p>Error: {error}</p>}
//          {data ? (
//            <pre>{JSON.stringify(data, null, 2)}</pre>
//          ) : (
//            <p>No data found</p>
//          )} */}
//       <Swiper
//         effect={isShuffling || change ? "cards" : "coverflow"}
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={"auto"}
//         coverflowEffect={{
//           rotate: 50,
//           stretch: 0,
//           depth: 100,
//           modifier: 1,
//           slideShadows: true,
//         }}
//         pagination={true}
//         mousewheel={{ forceToAxis: true, sensitivity: 1 }}
//         modules={[EffectCoverflow, EffectCards, Mousewheel, Pagination]}
//         className="mySwiper"
//       >
//         {shuffledIndices.map((index) => (
//           <SwiperSlide key={index}>
//             <div
//               className={`card ${isShuffling ? "shuffle-animation" : ""}`}
//               onClick={() => handleCardClick(index)}
//             >
//               <img
//                 className="front"
//                 src={cardData[index]?.frontImage}
//                 alt="Front"
//               />
//               <img
//                 className="back"
//                 src={cardData[index]?.backImage}
//                 alt="Back"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <div className={isHighlighted ? "highlighted" : "card-choosed-box"}></div>
//       <audio ref={audioRef} src={shuffleSound} />
//     </div>
//   );
// };

// export default OneCard;

// ==============================================================================================

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

import "../Styles/OneCard.css";
import {
  EffectCoverflow,
  EffectCards,
  Mousewheel,
  Pagination,
  Autoplay, // ✅ FIXED: Corrected import from 'autoplay' to 'Autoplay'
} from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneCard, saveOneCard } from "../redux/oneCardReducer/action";
import { useNavigate } from "react-router-dom";

const OneCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const swiperRef = useRef(null); // ✅ FIXED: Added Swiper reference

  const [enterAnimation, setEnterAnimation] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [flipped, setFlipped] = useState(false);

  // const { data, loading, error } = useSelector(
  //   (state) => state.oneCardReducer
  // ) || { data: null, loading: false, error: null };

  const { data, loading, error, savedCardStatus } = useSelector(
    (state) => state.oneCardReducer
  );

  useEffect(() => {
    dispatch(fetchOneCard());
    setTimeout(() => {
      setEnterAnimation(true);
    }, 300);
  }, [dispatch]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCardData(data);
    }
  }, [data]);

  const handleSaveCard = () => {
    const userId = localStorage.getItem("LoginUser"); // Fetch logged-in user's ID
    // if (!userId) {
    //   alert("User not logged in.");
    //   return;
    // }
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data
    if (!user || !user._id) {
      alert("Please log in to save the card.");
      return;
    }
    console.log(user);

    dispatch(saveOneCard(selectedCard._id, userId));
  };

  const handleCardClick = (index) => {
    const selected = cardData[index];

    // Ensure the selected card resets its flipped state
    setSelectedCard(selected);
    setFlipped(false); // Reset flip state when selecting a new card
    localStorage.setItem("selectedCard", JSON.stringify(selected));
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleBack = () => {
    navigate(-1);
    setSelectedCard(null);
    setFlipped(false);
    localStorage.removeItem("selectedCard");
  };

  const handleResetSelectedBack = () => {
    setSelectedCard(null); // Reset the selected card
    setFlipped(false); // Ensure card is not flipped
    localStorage.removeItem("selectedCard"); // Clear local storage if needed
  };

  const handleShuffle = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;

      // ✅ FIXED: Ensure Swiper instance exists before calling autoplay
      if (swiper) {
        swiper.params.autoplay = { delay: 100, disableOnInteraction: true };
        swiper.autoplay.start(); // ✅ FIXED: Ensure autoplay is enabled

        setTimeout(() => {
          setCardData((prevData) =>
            [...prevData].sort(() => Math.random() - 0.5)
          ); // Shuffle cards

          setTimeout(() => {
            swiper.autoplay.stop(); // ✅ FIXED: Stop autoplay after shuffle
            swiper.slideTo(1); // Reset to the first slide
          }, 200);
        }, 100);
      }
    }
  };

  return (
    <div
      className={`oneCard-container ${enterAnimation ? "enter-animation" : ""}`}
    >
      {!selectedCard ? (
        <>
          <Swiper
            ref={swiperRef} // ✅ FIXED: Attach Swiper reference
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            initialSlide={1}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: -50,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={false} // ✅ FIXED: Disable autoplay initially
            mousewheel={{ forceToAxis: true, sensitivity: 1 }}
            modules={[
              EffectCoverflow,
              EffectCards,
              Mousewheel,
              Pagination,
              Autoplay,
            ]} // ✅ FIXED: Include Autoplay module
            className="mySwiper"
          >
            {cardData.map((card, index) => (
              <SwiperSlide key={card._id}>
                <div className="card" onClick={() => handleCardClick(index)}>
                  <img className="front" src={card.frontImage} alt="Front" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="buttons_container">
            <button className="btn back-btn" onClick={handleBack}>
              <i className="ri-reply-line"></i>
            </button>
            <button className="btn shuffle-btn" onClick={handleShuffle}>
              <i className="ri-shuffle-fill"></i>
            </button>
          </div>
        </>
      ) : (
        <div className="selected-card" onClick={handleFlip}>
          <div className={`flip-card ${flipped ? "flipped" : ""}`}>
            <div className="card-face front">
              <img src={selectedCard.frontImage} alt="Front" />
            </div>
            <div className="card-face back">
              <img src={selectedCard.backImage} alt="Back" />
            </div>
          </div>
          {!flipped && (
            <button
              className="reset-back-btn"
              onClick={handleResetSelectedBack}
            >
              <i className="ri-arrow-left-line"></i> Back
            </button>
          )}
          {flipped && (
            <div className="description-container">
              <p className="description">{selectedCard.Description}</p>
              <div className="buttons_container">
                <button
                  className="reset-back-btn"
                  onClick={handleResetSelectedBack}
                >
                  <i className="ri-arrow-left-line"></i> Back
                </button>
                <div className="save-button-container">
                  <button className="save-btn" onClick={handleSaveCard}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OneCard;
