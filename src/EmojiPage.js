import React from "react";

function EmojiPage() {
    return (
      <div className="emoji">
        <p>In EmojiPage</p>
      </div>
    );
}
// list avail emojis website

export default EmojiPage;

// function addToExcluded(index) {
//     const emoji = emojis.splice(index, 1);
//     excludedEmojis.push(emoji[0]);
//     chrome.storage.local.set({"EBemojis": excludedEmojis});
// } 

// function removeFromExcluded(index) {
//     const emoji = excludedEmojis.splice(index, 1);
//     emojis.push(emoji[0]);
//     chrome.storage.local.set({"EBemojis": excludedEmojis});
// }