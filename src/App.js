import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./Navbar";
import HomePage from "./HomePage"
import FilterPage from "./FilterPage"
import EmojiPage from "./EmojiPage"
import "./App.css"

function App() {

  const [activePage, setActivePage] = useState("home");

  function handleNavClick(page) {
    setActivePage(page);
  }

  return (
    <div className="App">
      <Navbar active={activePage} handleClick={handleNavClick} />
      {activePage === "home" && (<HomePage />)}
      {activePage === "filter" && (<FilterPage />)}
      {activePage === "emoji" && (<EmojiPage />)}
    </div>
  );
  
}

export default App;