import Navbar from "react-bootstrap/Navbar";
import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <Navbar className="justify-content-center" fixed="bottom">
        <Navbar.Brand href="#home">
          <a className="footerLink" rel="noreferrer" target="_blank" href="https://zachyanez.com">
            By Zach Yanez
          </a>
          <a className="Install" target="_blank" href="https://docs.google.com/document/d/1cJESFTKpnsXO5vtK2foLeTPzledAYLUTQNWOR5kdMV8/edit?usp=sharing">[Instructions]</a>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}
