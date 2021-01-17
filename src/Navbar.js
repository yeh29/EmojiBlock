import React from "react";
import { Button, Image } from "react-bootstrap";
import "./Navbar.css";

function Navbar(props) {
  return (
    <div className="Navbar">
      <Image src="/logo.png" rounded />
      <div className="button-toolbar">
        <Button className={props.active === "home"? "selected" : "not-selected"} variant="dark" 
          onClick={() => props.handleClick("home")}>
          Home
        </Button>
        <Button className={props.active === "filter"? "selected" : "not-selected"} variant="dark" 
          onClick={() => props.handleClick("filter")}>
          Filters
        </Button>
        <Button className={props.active === "emoji"? "selected" : "not-selected"} variant="dark" 
          onClick={() => props.handleClick("emoji")}>
          Emojis
        </Button>
      </div>
    </div>
  );
}

export default Navbar;