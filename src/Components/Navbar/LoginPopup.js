import React, { useState, useRef, useEffect } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import { FaUserAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setTrigger) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
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

const LoginPopup = ({ Trigger, setTrigger }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setTrigger);

  const hackerUser = {
    email: "hacker@htn.com",
    password: "Let'sGiveIvanAnInterview",
  };

  const [details, setDetails] = useState({
    email: "hacker@htn.com",
    password: "Let'sGiveIvanAnInterview",
  });

  const set = (name) => {
    return ({ target: { value } }) => {
      setDetails((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const [error, setError] = useState("");

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

  return Trigger ? (
    <div className="login-popup">
      <div ref={wrapperRef} className="login-popup-inner">
        <div className="login-content">
          <h2 className="login-title">Login</h2>
          <form className="login" onSubmit={submitHandler}>
            <div className="form-inner">
              <div className="login-field">
                <FaUserAlt className="login-icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="login-input"
                  onChange={set("email")}
                  value={details.email}
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
                />
              </div>
            </div>
            {error !== "" ? <div className="login-error">{error}</div> : ""}
            <button type="submit" className="login-submit-btn">
              Log In
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
  ) : (
    ""
  );
};

export default LoginPopup;
