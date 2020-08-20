/*global chrome*/

import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

function FilterTable(props) {

  const [searchFilter, setSearchFilter] = useState(props.filters);
  const [removeType, setRemoveType] = useState("*removeAll*");
  const [confirmVis, setConfirmVis] = useState(false);
  const input = useRef(null);

  useEffect(() => {
    input.current.value = "";
    setSearchFilter(props.filters);
  }, [props.filters]);

  function handleSearchChange(event) {
    if(event.target.value === "") {
      setSearchFilter(props.filters);
    } else {
      setSearchFilter(props.filters.filter(filter => filter.toLowerCase().startsWith(event.target.value.toLowerCase())));
    }
  }

  function handleRemove(filter) {
    let newFilters = props.filters;
    newFilters.splice(newFilters.findIndex(element => element === filter), 1);
    chrome.storage.local.set({"EBfilters": newFilters});
    setConfirmVis(false);
    props.setFilters(newFilters);
    props.setMessage("OK");
  }

  function handleRemoveAll() {
    let newFilters;
    if(searchFilter.length === props.filters.length) {
      newFilters = []
    } else {
      newFilters = props.filters.filter(filter => !searchFilter.includes(filter));
    }
    chrome.storage.local.set({"EBfilters": newFilters});
    setConfirmVis(false);
    props.setFilters(newFilters);
    props.setMessage("OK");
  }

  function fillTable(filter) {
    return (
    <tr onDoubleClick={() => {setConfirmVis(true); setRemoveType(filter)}}>
      <td>
        {filter}
      </td>
    </tr>);
  }

  return (
    <div className="filter-table">
      <Modal show={confirmVis} onHide={() => setConfirmVis(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal of Filter(s)</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmVis(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => {removeType === "*removeAll*"? handleRemoveAll() : handleRemove(removeType)}}>
            Confirm Remove
          </Button>
        </Modal.Footer>
      </Modal>
      <Form.Control type="text" placeholder="Search Filters" onChange={handleSearchChange} ref={input}></Form.Control>
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr><th>Current Filters</th></tr>
        </thead>
        <tbody>
          {searchFilter.map(fillTable)}
        </tbody>
      </Table>
      <h6>Double click to remove an entry.</h6>
      <Button variant="primary" onClick={() => {setConfirmVis(true); setRemoveType("*removeAll*")}}>Remove All</Button>
    </div>
  );
}

export default FilterTable;