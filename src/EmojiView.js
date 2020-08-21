/*global chrome*/

import React from "react";
import { Button, Figure } from "react-bootstrap";

function EmojiView(props) {

  function handleClick() {
    let newEmojis;
    let newExcluded;
    const emojiIndex = props.emojis.map(emoji => emoji.title).indexOf(props.selected.title);
    if(emojiIndex === -1) {
        const excludedIndex = props.excluded.map(element => element.title).indexOf(props.selected.title);
        newExcluded = props.excluded;
        const removed = newExcluded.splice(excludedIndex, 1);
        newEmojis = [...props.emojis, ...removed].sort((a, b) => (a.title > b.tile)? 1 : ((b.title > a.title)? -1 : 0));
    } else {
        newEmojis = props.emojis;
        const removed = newEmojis.splice(emojiIndex, 1);
        newExcluded = [...props.excluded, ...removed].sort((a, b) => (a.title > b.tile)? 1 : ((b.title > a.title)? -1 : 0));
    }
    chrome.storage.local.set({"EBemojis": newEmojis});
    chrome.storage.local.set({"EBexcluded": newExcluded});
    props.setEmojis(newEmojis);
    props.setExcluded(newExcluded);
  }

  return (
    <div className={"emoji-view"}>
      {props.selected !== undefined && (
          <React.Fragment>
            <Figure>
                <Figure.Image width={120} height={120} src={props.selected.url} />
                <Figure.Caption>{props.selected.title}</Figure.Caption>
            </Figure>
            <Button variant="primary" onClick={handleClick}>Change</Button>
          </React.Fragment>
      )}
    </div>
  );
}

export default EmojiView;