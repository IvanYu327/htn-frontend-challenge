import React, { useState, useRef, useEffect } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";

// hook to close do something when a click occurs outside of the target element
// Used to close the login popup when user clicks outside it
function useOutsideAlerter(ref, setTrigger) {
  useEffect(() => {
    //check if clicks are on the element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setTrigger(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setTrigger]);
}

//Login popup element, shown if the trigger is true
const LoginPopup = ({ Trigger, setTrigger }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setTrigger);

  // hardcorded username
  const hackerUser = {
    email: "ivan@htn.com",
    password: "Let'sGiveIvanAnInterview",
  };

  // user details currently entered on screen
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const set = (name) => {
    return ({ target: { value } }) => {
      setDetails((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const [error, setError] = useState("");

  //verify login
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("attempting login");
    console.log(details);
    if (
      details.email === hackerUser.email &&
      details.password === hackerUser.password
    ) {
      sessionStorage.setItem("name", "Ivan");

      sessionStorage.setItem("logged in", true);

      console.log(sessionStorage.getItem("logged in"));

      console.log("Logged in");
      setError("");
      window.location.reload();
    } else {
      setError("Invalid Login");
    }
  };

  //return component
  return Trigger ? (
    <div className="login-popup">
      <div ref={wrapperRef} className="login-popup-inner">
        <div className="login-content">
          <h2 className="login-title">Login</h2>
          <form className="login" onSubmit={submitHandler}>
            <div className="form-inner">
              <div className="login-field">
                <MdEmail className="login-icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="login-input"
                  onChange={set("email")}
                  value={details.email}
                  placeholder="Email"
                />
              </div>
              <div className="login-field">
                <AiFillLock className="login-icon" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="login-input"
                  onChange={set("password")}
                  value={details.password}
                  placeholder="Password"
                />
              </div>
            </div>
            {error !== "" ? <div className="login-error">{error}</div> : ""}
            <button type="submit" className="login-submit-btn">
              Login
            </button>
          </form>

          <CloseButton
            className="close-login-btn"
            onClick={() => setTrigger(false)}
            aria-label="Hide"
          />
        </div>
        <div className="login-background">
          <span className="login-background-shape login-background-shape3"></span>
          <span className="login-background-shape login-background-shape2"></span>
          <span className="login-background-shape login-background-shape1"></span>
        </div>
      </div>
    </div>
  ) : null;
};

export default LoginPopup;
