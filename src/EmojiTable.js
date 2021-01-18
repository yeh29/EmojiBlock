/*global chrome*/

import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "./EmojiTable.css";

function EmojiTable(props) {

  const [search, setSearch] = useState(props.currTable);
  const [confirmVis, setConfirmVis] = useState(false);
  const input = useRef(null);

  useEffect(() => {
    input.current.value = "";
    setSearch(props.currTable);
  }, [props.currTable]);

  function handleSearchChange(event) {
    if(event.target.value === "") {
      setSearch(props.currTable);
    } else {
      setSearch(props.currTable.filter(element => element.title.toLowerCase().startsWith(event.target.value.toLowerCase())));
    }
  }

  function fillTable(emoji) {
    return (
    <tr onDoubleClick={() => {props.setSelected(emoji)}}>
      <td>
        {emoji.title}
      </td>
    </tr>);
  }

  function handleChangeAll() {
    let newTable = [];
    let otherTable;
    if(search.length === props.currTable.length) {
      newTable = [];
      otherTable = [...props.currTable, ...props.otherTable].sort((a, b) => (a.title > b.tile)? 1 : ((b.title > a.title)? -1 : 0));
    } else {
      let temp = [];
      props.currTable.forEach(element => {
        if(search.includes(element)) {
            temp.push(element);
        } else {
            newTable.push(element);
        }
      });
      otherTable = [...temp, ...props.otherTable].sort((a, b) => (a.title > b.tile)? 1 : ((b.title > a.title)? -1 : 0));
    }
    if(props.message === "Emojis") {
      chrome.storage.local.set({"EBemojis": newTable});
      chrome.storage.local.set({"EBexcluded": otherTable});
    } else {
      chrome.storage.local.set({"EBemojis": otherTable});
      chrome.storage.local.set({"EBexcluded": newTable});
    }
    setConfirmVis(false);
    props.setCurr(newTable);
    props.setOther(otherTable);
  }

  return (
    <div className={"emoji-table " + props.message}>
      <Modal show={confirmVis} onHide={() => setConfirmVis(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Change in Emoji(s)</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmVis(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleChangeAll}>
            Confirm Change
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="change-directions">
        <p>Click the following button to change all emojis to the other side.</p>
        <Button variant="primary" onClick={() => {setConfirmVis(true)}}>Change All</Button>
      </div>
      <Form.Control type="text" placeholder={"Search " + props.message} onChange={handleSearchChange} ref={input} />
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr><th>Current {props.message}</th></tr>
        </thead>
        <tbody>
          {search.map(fillTable)}
        </tbody>
      </Table>
    </div>
  );
}

export default EmojiTable;