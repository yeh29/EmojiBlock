/*global chrome*/

import React, { useState, useEffect } from "react";
import EmojiTable from "./EmojiTable";
import EmojiView from "./EmojiView";

function EmojiPage() {
  
  const link = "https://emojipedia.org/google/";

  const [emojis, setEmojis] = useState([]);
  const [excluded, setExcluded] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(["EBemojis"], result => {
      setEmojis(result.EBemojis);
    });
    chrome.storage.local.get(["EBexcluded"], result => {
      setExcluded(result.EBexcluded);
    });
  }, [])

  return (
    <div className="emoji">
      <h1>Emojis</h1>
      <a href={link}><h6>List of available emojis.</h6></a>
      <EmojiTable currTable={emojis} otherTable={excluded} setCurr={setEmojis} setOther={setExcluded} 
        setSelected={setSelectedEmoji} message="Emojis"/>
      <EmojiTable currTable={excluded} otherTable={emojis} setCurr={setExcluded} setOther={setEmojis}
        setSelected={setSelectedEmoji} message="Excluded Emojis"/>
      {selectedEmoji !== null && (
        <EmojiView selected={selectedEmoji} emojis={emojis} excluded={excluded} setEmojis={setEmojis} setExcluded={setExcluded} />
      )}
    </div>
  );
}

export default EmojiPage;