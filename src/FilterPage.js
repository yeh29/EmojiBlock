/*global chrome*/

import React, { useState, useEffect, useRef } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import FilterTable from "./FilterTable"

function FilterPage() {

  const link = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet";
  const input = useRef(null);
  const [filters, setFilters] = useState([]);
  const [message, setMessage] = useState("OK");
  
  useEffect(() => {
    chrome.storage.local.get(["EBfilters"], result => {
      setFilters(result.EBfilters);
    });
  }, []);

  function handleAddClick() {
    const filter = input.current.value;
    try {
      new RegExp(filter);
    } catch(error) {
      setMessage("Invalid Filter Regex Syntax");
      return;
    }
    
    if(filter !== "" && !filters.includes(filter)) {
      const newFilters = [...filters, filter].sort();
      chrome.storage.local.set({"EBfilters": newFilters});
      setFilters(newFilters);
      setMessage("OK");
    } else if(filter !== "") {
      setMessage("Filter Already Exists");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleAddClick();
  }

  return (
    <div className="filter">
      <h1>Filters</h1>
      {message !== "OK" && (<Alert variant="danger">{message}</Alert>)}
      <Form inline onSubmit={handleSubmit}>
        <Form.Label>
          <a href={link}><h6>Follow JavaScript regex syntax.</h6></a>
        </Form.Label>
        <Form.Control type="text" placeholder="Add Filter" ref={input}/>
        <Button variant="success" onClick={handleAddClick}>Add Filter</Button>
      </Form>
      <h6>Rules</h6>
      <FilterTable filters={filters} setFilters={setFilters} setMessage={setMessage}/>
    </div>
  );
}

export default FilterPage;