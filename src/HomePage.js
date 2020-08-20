/*global chrome*/

import React, { useState, useEffect } from "react";
import { Image, Jumbotron } from "react-bootstrap";

function HomePage() {

  const [numAds, setNumAds] = useState("0");

  useEffect(() => {
    chrome.storage.local.get(["EBnumber"], result => {
      setNumAds(result.EBnumber.toLocaleString());
    });
  }, []);

  return (
    <div className="home">
      <Jumbotron>
        <h1>EmojiBlock</h1>
        <Image src="/logo.png" rounded />
        <h1>EmojiBlock</h1>
        <p>Number of Ads Blocked: {numAds}</p>
      </Jumbotron>
    </div>
  );
}

export default HomePage;