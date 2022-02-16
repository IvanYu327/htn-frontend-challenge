import React from "react";
import "../styles/PageNotFound.css";

const PageNotFound = ({ type }) => {
  switch (type) {
    case "Login Required":
      return (
        <div>
          <h1 className="page-not-found">
            This page is only for hackers, log in or sign up for Hack the North!
          </h1>
        </div>
      );
    default:
      return (
        <div>
          <h1 className="page-not-found">
            Could not find the page you were looking for!
          </h1>
        </div>
      );
  }
};

export default PageNotFound;
