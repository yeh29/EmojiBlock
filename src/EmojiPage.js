/*global chrome*/

import React, { useState, useEffect } from "react";
import EmojiTable from "./EmojiTable";
import EmojiView from "./EmojiView";
import "./EmojiPage.css";

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
      <p><a href={link}>List of available emojis.</a> Double click any table entry to view the emoji.</p>
      {selectedEmoji !== null && (
        <EmojiView selected={selectedEmoji} emojis={emojis} excluded={excluded} setEmojis={setEmojis} setExcluded={setExcluded} />
      )}
      <div className="emoji-tables">
        <EmojiTable currTable={emojis} otherTable={excluded} setCurr={setEmojis} setOther={setExcluded} 
          setSelected={setSelectedEmoji} message="Emojis"/>
        <EmojiTable currTable={excluded} otherTable={emojis} setCurr={setExcluded} setOther={setEmojis}
          setSelected={setSelectedEmoji} message="Excluded Emojis"/>
      </div>
    </div>
  );
}

export default EmojiPage;