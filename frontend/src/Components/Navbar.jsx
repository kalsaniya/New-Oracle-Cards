import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authReducer/action";
import { useNavigate, NavLink } from "react-router-dom";
import "../Styles/Navbar.css";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <header className="header">
        {/* <h1 className="logo">Angels On Earth</h1> */}
        <div className="logo">
          <a href="/">Angels On Earth</a>
        </div>
        <nav className="nav">
          <ul>
            {/* <li>
              <NavLink to="/new-cards">New Cards</NavLink>
            </li> */}
            <li>
              <NavLink to="/browse-cards">Browse Cards</NavLink>
            </li>
            <li>
              <NavLink to="/saved-cards">Saved Cards</NavLink>
            </li>
            <li>
              <NavLink to="/view-guidebook">View Guidebook</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>

            <li>
              <button className="btn btn_logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
