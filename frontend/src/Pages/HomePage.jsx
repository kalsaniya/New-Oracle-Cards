import React from "react";
import "../Styles/HomePage.css";
import { Navbar } from "./../Components/Navbar";
import HeroSection from "../Components/HeroSection";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import NewCards from "./NewCards";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <NewCards />
      {/* <HeroSection /> */}
      <div className="content">
        <Outlet />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
