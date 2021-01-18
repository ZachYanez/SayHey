import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {useState} from 'react'
import Content from './Content'


export default function Main() {

  const [message, setMessage]=useState();

  function handleChange(e){
  e.preventDefault()
  setMessage(e.target.value)
  console.log(e.target.value)}

  return (
    <div>
      <Navbar bg="l" variant="light" fixed="top">
        <Navbar.Brand>sayHey</Navbar.Brand>
        <Nav className="mr-auto">
          <DropdownButton id="dropdown-item-button" title="Presets">
            <Dropdown.Item name="message" onClick={handleChange} type="text" value="Hey, I'm Zach" as="button">Hey, I'm Zach</Dropdown.Item>
            <Dropdown.Item name="message" onClick={handleChange} type="text" value="512-740-3455" as="button">512-740-3455</Dropdown.Item>
            <Dropdown.Item  name="message" onClick={handleChange} type="text" value="What's your name?" as="button">What's your name?</Dropdown.Item>
            <Dropdown.Item name="message" onClick={handleChange} type="text" value="Would you like to join me?" as="button">Would you like to join me?</Dropdown.Item>
          </DropdownButton>
        </Nav>
        <Form inline>
          <FormControl name="message" type="text" placeholder="Message" onChange={handleChange} className="mr-sm-2" />
        </Form>
      </Navbar>
      <div className="row buffer"/>
      <div className="fluid content justify-content-center row">
      <Content
       message={message}
      />
      </div>
      <div className="row"/>
    </div>
  );
}


