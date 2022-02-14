import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "../../Styles/Navbar.css";
import LoginPopup from "./LoginPopup";

const Navbar = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const Logout = () => {
    sessionStorage.setItem("name", "");
    sessionStorage.setItem("logged in", false);
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <h1 className="navbar-title">HTN Events</h1>

      <Link to="/">Events</Link>

      {sessionStorage.getItem("logged in") === "true" ? (
        <div className="logged-in-wrapper">
          <span>Hi {sessionStorage.getItem("name")}!</span>
          <button className="logout" onClick={Logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="login-wrapper">
          <button onClick={() => setShowLoginPopup(true)}> Login</button>
          <LoginPopup Trigger={showLoginPopup} setTrigger={setShowLoginPopup} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
