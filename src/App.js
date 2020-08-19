import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./Navbar";
import HomePage from "./HomePage"
import FilterPage from "./FilterPage"
import EmojiPage from "./EmojiPage"

function App() {

  const [activePage, setActivePage] = useState("home");

  function handleNavClick(page) {
    if(activePage !== page) {
      setActivePage(page);
    }
  }

  useEffect(() => {
  }, [activePage]);

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