import React from "react";
import { useIndexedDB } from 'react-indexed-db'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import {useState} from 'react'
import Content from './Content'



export default function Main() {

  const db = useIndexedDB('presets');


  // Message input & preset 
  const [message, setMessage]=useState();

  function handleChange(e){
  e.preventDefault()
  setMessage(e.target.value)
  console.log(e.target.value)}

// Modal 
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function AddPresets () {

      const { add } = useIndexedDB('presets');

      

        const indexClick = () => {
        add({ message: '' }).then(
          event => {
            console.log('Preset Indexed: ');
          },
          error => {
            console.log(error);
          }
        );
      };
      indexClick();
      handleClose();
    };
    

  return (
    <div>
      <Navbar bg="l" variant="light" fixed="top">
        <Navbar.Brand>sayHey</Navbar.Brand>
        <Nav className="mr-auto">
          <DropdownButton id="dropdown-item-button" title="Presets">

          <Dropdown.Item onClick={handleShow} type="text" as="button">Add Presets +</Dropdown.Item>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Preset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
    <FormControl
      placeholder="Message"
      aria-label="Message Preset"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <InputGroup.Text onClick={handleClose} onClick={AddPresets} value={this} as="button" id="basic-addon2">Save</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
        </Modal.Body>
      </Modal>


            <Dropdown.Item onClick={handleChange} value="Hey, I'm Zach" type="text" as="button">Hey, I'm Zach</Dropdown.Item>
            <Dropdown.Item onClick={handleChange}  value="512-740-3455" type="text" as="button">512-740-3455</Dropdown.Item>
            <Dropdown.Item onClick={handleChange}  value="What's your name?" type="text"as="button">What's your name?</Dropdown.Item>
            <Dropdown.Item onClick={handleChange}  value="May I sit with you?" type="text" as="button">May I sit with you?</Dropdown.Item>
          </DropdownButton>
        </Nav>
        <Form inline>
          <FormControl name="message" type="text" placeholder="Message" value="" onChange={handleChange} className="mr-sm-2" />
        </Form>
      </Navbar>
      <div className="buffer"/>
      <div className="content justify-content-center row"> 
      <Content 
      message={message}/>
      </div>
      
    </div>
  );
}

