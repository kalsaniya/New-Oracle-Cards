import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import axios from "axios";
import styles from "../Styles/BrowseCards.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchOneCard } from "../redux/oneCardReducer/action";

const BrowseCards = () => {
  const [cardData, setCardData] = useState([]);

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.oneCardReducer
  ) || { data: null, loading: false, error: null };

  useEffect(() => {
    dispatch(fetchOneCard());
  }, [dispatch]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCardData(data);
    }
  }, [data]);

  return (
    <>
      <div className={styles.BrowseCard_Container}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className={"mySwiper swiper-browseCard"}
        >
          {cardData.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="card ">
                <img className="back" src={data.backImage} alt="Back Image" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default BrowseCards;
