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
  const INITIAL_PRESETS = [{ id: -1, message: "Hey" }];
  const { add, getAll, deleteRecord } = useIndexedDB("presets");

  const [message, setMessage] = useState();
  const [preset, setPreset] = useState("");
  const [presets, setPresets] = useState(INITIAL_PRESETS);

  useEffect(() => {
    const populateStateWithDbRecords = async () => {
      const records = await getAll();
      console.log("records found in DB, udpating state: ", records);
      setPresets([...INITIAL_PRESETS, ...records]);
    };

    populateStateWithDbRecords();
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function AddPresets() {
    try {
      const generatedId = await add({ message: preset });
      console.log("Added to db: ", { id: generatedId, message: preset });

      setPresets((prevPresets) => {
        return [...prevPresets, { id: generatedId, message: preset }];
      });
    } catch (err) {
      console.error(err);
    }
    handleClose();
  }


  function deletePreset(id) {
    deleteRecord(id).then(() => {
      alert(`Deleted`);
    });

    setPresets((prevPresets) => {
      const presetsCopy = [...prevPresets];
      const indexOfRecordToDelete = presetsCopy.findIndex((p) => p.id === id);
      const howManyToDelete = 1;
      presetsCopy.splice(indexOfRecordToDelete, howManyToDelete);
      return presetsCopy;
    });
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
            {presets.map((preset) => {
              const { id, message } = preset;
              return (
                <Dropdown.Item
                  key={message}
                  onClick={() => setMessage(message)}
                  value={message}
                  type="text"
                  as="button"
                >
                  {message}
                  <a
                    onClick={() => {
                      deletePreset(id);
                    }}
                    className="deleteBtn"
                    as="button"
                  >
                    x
                  </a>
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Nav>
        <Form inline>
          <FormControl
            name="message"
            type="text"
            placeholder="Message"
            value={message}
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
