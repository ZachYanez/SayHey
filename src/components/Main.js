import React from "react";
import { useIndexedDB } from "react-indexed-db";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";
import Content from "./Content";

export default function Main() {
  const { add, getAll, deleteRecord } = useIndexedDB("presets");

  const INITIAL_PRESETS = ["Hey"];

  // Message input & preset
  const [message, setMessage] = useState();

  const [preset, setPreset] = useState("");

  const [presets, setPresets] = useState(INITIAL_PRESETS);

  // catch any presets left in db from previous session on initial render only https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // https://www.npmjs.com/package/react-indexed-db#getall
    getAll().then((presetDbDocument) => {
      console.log("presetDbDocument ", presetDbDocument.message);
      if (presetDbDocument) {
        console.log("presets found in DB, adding to list: ", presetDbDocument.message);
        const indexedPresets = presetDbDocument.map((p) => p.message);
        setPresets([...INITIAL_PRESETS, ...indexedPresets]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setMessage(e.target.value);
    console.log(e.target.value);
  }

  function handlePreset(e) {
    setPreset(e.target.value);
  }

  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Adds to DB. Called in handlePreset();
  function AddPresets() {
    const indexClick = (event) => {
      add({ message: preset }).then(
        (event) => {
          console.log("Preset Indexed: ", preset);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    indexClick();
    handleClose();

    // the async-safe way to build upon previous state vals and mitigate overwrite risk https://reactjs.org/docs/hooks-reference.html#functional-updates
    setPresets((prevPresets) => {
      const presetsCopy = [...prevPresets];
      const numberToDelete = 1;
      const indexOfMessageToDelete = presetsCopy.indexOf(message);
      presetsCopy.splice(indexOfMessageToDelete, numberToDelete);
      return presetsCopy;
    });
  }

  function DeletePreset(message) {
    getAll().then((dbRecords) => {
      for (const record of dbRecords) {
        if (record.message === message){
          deleteRecord(record.id).then((event) => {
            alert("Deleted!")
          })
        }}});
  }

  return (
    <div>
      <Navbar bg="l" variant="light" fixed="top">
        <Navbar.Brand>sayHey</Navbar.Brand>
        <Nav className="mr-auto">
          <DropdownButton id="dropdown-item-button" title="Presets">
            <Dropdown.Item onClick={handleShow} type="text" as="button">
              Add Preset +
            </Dropdown.Item>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Preset</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="mb-3">
                  <FormControl
                    onChange={handlePreset}
                    value={this}
                    placeholder="Message"
                    aria-label="Message Preset"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text onClick={AddPresets} id="basic-addon2">
                      Save
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Modal.Body>
            </Modal>
            {/* js in jsx https://reactjs.org/docs/jsx-in-depth.html#javascript-expressions-as-children */}
            {presets.map((preset) => {
              
              return (
              <Dropdown.Item 
              key={preset} 
              onClick={handleChange} 
              value={preset} 
              type="text" 
              as="button">
                {preset}
                <a onClick={() => {
                  DeletePreset(message);
                 }} className="deleteBtn" as="button">
                  x
                </a>
              </Dropdown.Item>
            )})}
          </DropdownButton>
        </Nav>
        <Form inline>
          <FormControl
            name="message"
            type="text"
            placeholder="Message"
            value={this}
            onChange={handleChange}
            className="mr-sm-2"
          />
        </Form>
      </Navbar>
      <div className="buffer" />
      <div className="content justify-content-center row">
        <Content message={message} />
      </div>
    </div>
  );
}
