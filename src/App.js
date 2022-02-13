import React from "react";

import "./Styles/App.css";

import EventSearcher from "./Components/EventSearcher/EventSearcher.js";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />

      <EventSearcher />
    </div>
  );
}

export default App;
