/*global chrome*/

import React, { useState, useEffect } from "react";
import { Button, Image, Jumbotron } from "react-bootstrap";
import "./HomePage.css";

function HomePage() {

  const [numAds, setNumAds] = useState("0");
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
   chrome.storage.local.get(["EBnumber"], result => {
      setNumAds(result.EBnumber.toLocaleString());
    });
    chrome.storage.local.get(["EBenabled"], result => {
      setEnabled(result.EBenabled);
    });
  }, []);

  function handleClick() {
    chrome.storage.local.set({"EBenabled": !enabled});
    setEnabled(!enabled);
  }

  return (
    <div className="home">
      <Jumbotron id="logobox">
        <h1>EmojiBlock</h1>
        <Image src="/logo.png" rounded />
        {enabled && (<Button variant="danger" onClick={handleClick}>Disable</Button>)}
        {!enabled && (<Button variant="success" onClick={handleClick}>Enable</Button>)}
      </Jumbotron>
      <Jumbotron id="numberbox">
        <h1>Number of Ads Blocked</h1>
        <h2>{numAds}</h2>
      </Jumbotron>
    </div>
  );
}

export default HomePage;