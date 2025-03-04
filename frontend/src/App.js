import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import NewCards from "./Pages/NewCards";
import BrowseCards from "./Pages/BrowseCards";
import SavedCards from "./Pages/SavedCards";
import ViewGuidebook from "./Pages/ViewGuidebook";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useEffect } from "react";
import MainLayout from "./Components/MainLayout";
import OneCard from "./Pages/OneCard";
import TwoCards from "./Pages/TwoCards";
import ThreeCards from "./Pages/ThreeCards";
import FiveCards from "./Pages/FiveCards";

function App() {
  useEffect(() => {
    const createStars = () => {
      const numStars = 100;
      const starsContainer = document.querySelector(".background-animation");
      starsContainer.innerHTML = "";

      for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.classList.add("star");

        let x = Math.random() * 100;
        let y = Math.random() * 100;

        star.style.top = `${y}vh`;
        star.style.left = `${x}vw`;

        star.style.animationDuration = `${Math.random() * 5 + 5}s`;

        starsContainer.appendChild(star);
      }
    };

    createStars();
  }, []);

  useEffect(() => {
    const createShootingStars = () => {
      const numStars = 5; // Adjust number of shooting stars
      const starsContainer = document.querySelector(".background-animation");

      for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.classList.add("shooting-star");

        let x = Math.random() * 100;
        let y = Math.random() * 100;

        star.style.top = `${y}vh`;
        star.style.left = `${x}vw`;
        star.style.animationDuration = `${Math.random() * 3 + 3}s`;

        starsContainer.appendChild(star);

        setTimeout(() => {
          star.remove(); // Remove star after animation
        }, 5000);
      }
    };

    setInterval(createShootingStars, 3000); // New shooting stars every few seconds
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Include the Navbar component */}
        <div className="background-animation"></div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-cards"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <NewCards />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/browse-cards"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <BrowseCards />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-cards"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SavedCards />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-guidebook"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ViewGuidebook />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/one-card"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <OneCard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/two-card"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <TwoCards />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/three-card"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ThreeCards />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/five-card"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <FiveCards />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
