import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.webp";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPopup from "./LoginPopup";
import "../../styles/Navbar.css";

//navbar component
const Navbar = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // logout function
  const Logout = () => {
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("logged in", false);
    routeChange();
    window.location.reload();
  };

  // routing for the event tab button
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("");
  };

  // return navbar comopnents
  return (
    <nav className="nav">
      <img src={logo} alt="Logo" className="logo" />

      <div className="nav-btn-wrapper">
        <Link className="nav-event-button" to="">
          Events
        </Link>
      </div>

      <div className="login-wrapper">
        {sessionStorage.getItem("logged in") === "true" ? (
          <div className="logged-in-wrapper">
            <div className="nav-username">{sessionStorage.getItem("name")}</div>
            <button className="logout-btn" onClick={Logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="login-wrapper">
            <button
              className="login-btn"
              onClick={() => setShowLoginPopup(true)}
            >
              Login
            </button>
            <LoginPopup
              Trigger={showLoginPopup}
              setTrigger={setShowLoginPopup}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
