import React, { useState } from "react";

const LoginPopup = ({ Trigger, setTrigger }) => {
  const hackerUser = {
    email: "hacker@htn.com",
    password: "123",
  };

  const [details, setDetails] = useState({
    name: "Hacker",
    email: "hacker@htn.com",
    password: "123",
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
      sessionStorage.setItem("name", details.name);
      sessionStorage.setItem("logged in", true);

      console.log(sessionStorage.getItem("name"));
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
      <div className="login-popup-inner">
        <h2>Login</h2>
        <div className="login-form">
          <form onSubmit={submitHandler}>
            <div className="form-inner">
              <div className="form-group">
                <label htmlFor="email">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  maxLength="15"
                  onChange={set("name")}
                  value={details.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={set("email")}
                  value={details.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={set("password")}
                  value={details.password}
                />
              </div>
            </div>
            {error !== "" ? <div className="login-error">{error}</div> : ""}
            <input type="submit" value="Log In" />
          </form>
        </div>

        <button className="close-login-btn" onClick={() => setTrigger(false)}>
          close
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default LoginPopup;
