import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useState} from 'react'
import Content from './Content'

export default function Header() {

  // const {message, setMessage} = useState()
   
  handleClick = (e) => {console.log(e.target.value)}

  return (
    <div>
      <Navbar bg="l" variant="light" fixed="top">
        <Navbar.Brand>HeyFrom6</Navbar.Brand>
        <Nav className="mr-auto">
          <DropdownButton id="dropdown-item-button" title="Presets">
            <Dropdown.Item as="button">Hey, I'm Zach</Dropdown.Item>
            <Dropdown.Item as="button">512-740-3455</Dropdown.Item>
            <Dropdown.Item as="button">What's your name?</Dropdown.Item>
            <Dropdown.Item as="button">Something else</Dropdown.Item>
          </DropdownButton>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Message" className="mr-sm-2" />
          <Button onclick={handleClick} variant="outline-primary">Say It</Button>
        </Form>
      </Navbar>
      <Content/>
    </div>
  );
}


