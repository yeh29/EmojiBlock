/*global chrome*/

import React, { useState, useEffect } from "react";
import { Button, Image, Jumbotron } from "react-bootstrap";

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
      <Jumbotron>
        <h1>EmojiBlock</h1>
        <Image src="/logo.png" rounded />
      </Jumbotron>
      <Jumbotron>
        <p>Number of Ads Blocked: {numAds}</p>
        {enabled && (<Button variant="danger" onClick={handleClick}>Disable</Button>)}
        {!enabled && (<Button variant="success" onClick={handleClick}>Enable</Button>)}
      </Jumbotron>
    </div>
  );
}

export default HomePage;