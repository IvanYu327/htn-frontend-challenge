import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./Styles/App.css";

import EventSearcher from "./Components/EventSearcher/EventSearcher.js";
import Navbar from "./Components/Navbar/Navbar";
import EventDetails from "./Components/EventDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventSearcher />} />
        <Route path="/:eventName" element={<EventDetails />} />
      </Routes>
    </>
  );
}

export default App;
