/*global chrome*/

import React, { useState, useEffect } from "react";

function HomePage() {

    const [numAds, setNumAds] = useState("Loading");

    useEffect(() => {
    }, [numAds]);

    if(numAds === "Loading") {
      chrome.storage.local.get(["EBnumber"], result => {
        setNumAds(result.EBnumber.toLocaleString());
      });
      return (<div className="home"></div>);
    } else {
      return (
        <div className="home">
          <h1>EmojiBlock</h1>
          <img src="/logo.png" alt=""></img>
          <h1>EmojiBlock</h1>
          <p>Number of Ads Blocked: {numAds}</p>
        </div>
      );
    }
}

export default HomePage;