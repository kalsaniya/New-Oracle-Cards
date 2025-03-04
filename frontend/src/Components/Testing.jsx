import React from "react";
import "../Styles/Testing.css";
const Testing = () => {
  const [flipped, setFlipped] = useState([false, false, false, false]);

  const handleFlip = (index) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <div className="cards-container">
      {/* <h2 className="text-center mt-4 title">New Cards Page</h2> */}
      <div className="cards">
        {flipped.map((isFlipped, index) => (
          <div
            key={index}
            className={`card ${isFlipped ? "flipped" : ""}`}
            onClick={() => handleFlip(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src="https://tarotoo.com/wp-content/uploads/card-front-c-usual-625x1024.jpg-1.webp"
                  alt="Tarot Card Front"
                  className="card-image"
                />
              </div>
              <div className="card-back">
                <img
                  src="https://tarotoo.com/wp-content/uploads/card-back-usual-625x1024.jpg-1.webp"
                  alt="Tarot Card Back"
                  className="card-image"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default Testing;

// import React, { useState, useEffect } from "react";
// import "../Styles/OneCard.css";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, EffectCards, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/effect-cards";
// import "swiper/css/pagination";
// // import shuffleSound from "../../assets/shufflingCard.wav";
// import shuffleSound from "../assets/shufflingCard.wav";
// import axios from "axios";

// const OneCard = () => {
//   const [enterAnimation, setEnterAnimation] = useState(false);

//   const [cardData, setCardData] = useState([]);
//   const [shuffledIndices, setShuffledIndices] = useState([]);
//   const [isShuffling, setIsShuffling] = useState(false);
//   const [isHighlighted, setIsHighlighted] = useState(false);
//   const [change, setChange] = useState(false);
//   const [arrayOfObjects, setArrayOfObjects] = useState([]);
//   const audioRef = React.useRef(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setEnterAnimation(true); // Delay entry to match exit effect
//     }, 300);
//   }, []);

//   const fetchCustomsData = async () => {
//     try {
//       const response = await axios.get("/api/savedcard/getcard");
//       console.log("response data...", response.data);
//       setCardData(response.data);
//       setShuffledIndices(
//         Array.from({ length: response.data.length }, (_, index) => index)
//       );
//       console.log("response...", response);
//     } catch (error) {
//       console.error("Error fetching customs data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCustomsData();
//   }, []);

//   const Backend = (index) => {
//     const dataId = cardData[index]._id;
//     const frontImglink = cardData[index].frontImage;
//     const backImglink = cardData[index].backImage;
//     const description = cardData[index].Description;
//     const name = cardData[index].name;
//     const dataEntry1 = {
//       _id: dataId,
//       frontImage: frontImglink,
//       backImage: backImglink,
//       description: description,
//       name: name,
//     };

//     setIsHighlighted(!isHighlighted);
//     setArrayOfObjects([dataEntry1]);
//     localStorage.setItem("oneCard", JSON.stringify(arrayOfObjects));
//     console.log(
//       "localStorage called..",
//       localStorage.setItem("oneCard", JSON.stringify([dataEntry1]))
//     );
//     window.location.href = "/displaying-onecard";
//   };

//   return (
//     <div
//       className={`one-card-container ${
//         enterAnimation ? "enter-animation" : ""
//       }`}
//     >
//       <h1>One Card Page</h1>

//       <div className="oneCard-container">
//         <Swiper
//           effect={isShuffling || change ? "cards" : "coverflow"}
//           grabCursor={true}
//           centeredSlides={true}
//           slidesPerView={"auto"}
//           coverflowEffect={{
//             rotate: 50,
//             stretch: 0,
//             depth: 100,
//             modifier: 1,
//             slideShadows: true,
//           }}
//           pagination={true}
//           modules={[EffectCoverflow, EffectCards, Pagination]}
//           className="mySwiper"
//         >
//           {shuffledIndices.map((index) => (
//             <SwiperSlide key={index}>
//               <div
//                 className={`card ${isShuffling ? "shuffle-animation" : ""}`}
//                 onClick={() => {
//                   Backend(index);
//                 }}
//               >
//                 <img
//                   className="front"
//                   src={cardData[index].frontImage}
//                   alt="Front Image"
//                 />
//                 <img
//                   className="back"
//                   src={cardData[index].backImage}
//                   alt="Back Image"
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <div
//           className={isHighlighted ? "highlighted" : "card-choosed-box"}
//         ></div>
//       </div>

//       <audio ref={audioRef} src={shuffleSound} />
//     </div>
//   );
// };

export default { OneCard, Testing };
