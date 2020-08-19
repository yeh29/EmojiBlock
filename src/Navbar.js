import React from "react";
import { Button } from "react-bootstrap";

function Navbar(props) {
  return (
    <div className="Navbar">
      <img src="/logo.png" alt=""></img>
      <div className="button-group">
        <Button className={props.active === "home"? "selected" : "not-selected"} variant="info" 
          onClick={() => props.handleClick("home")}>
          Home
        </Button>
        <Button className={props.active === "filter"? "selected" : "not-selected"} variant="info" 
          onClick={() => props.handleClick("filter")}>
          Filters
        </Button>
        <Button className={props.active === "emoji"? "selected" : "not-selected"} variant="info" 
          onClick={() => props.handleClick("emoji")}>
          Emojis
        </Button>
      </div>
      <h6>EmojiBlock</h6>
    </div>
  );
}

export default Navbar;