import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPopup from "./LoginPopup";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const Logout = () => {
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("logged in", false);
    routeChange();
    window.location.reload();
  };

  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/HTN-EventSearcher/");
  };

  return (
    <nav className="nav">
      <img src={logo} alt="Logo" className="logo" />

      <div className="nav-btn-wrapper">
        <Link className="nav-event-button" to="/HTN-EventSearcher/">
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
