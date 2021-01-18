import Navbar from 'react-bootstrap/Navbar'
import React from 'react'

export default function Footer() {
    return (
        <div className="footer" >
            <Navbar className="justify-content-center" fixed="bottom">
    <Navbar.Brand href="#home">
      <a className="footerLink" rel="noreferrer" target="_blank" href="https://zachyanez.com">By Zach Yanez</a>
    </Navbar.Brand>
  </Navbar>
        </div>
    )
}
