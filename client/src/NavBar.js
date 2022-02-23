import React from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "./logo.svg";
import Identicon from "identicon.js";
export default function NavBar({ account }) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React Bootstrap - Election
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <img
                width={50}
                height={50}
                alt={""}
                src={
                  `data:image/svg+xml;base64,` +
                  new Identicon(account, {
                    foreground: [0, 0, 0, 255], // rgba black
                    background: [255, 255, 255, 255], // rgba white
                    margin: 0.2, // 20% margin
                    size: 420, // 420px square
                    format: "svg", // use SVG instead of PNG
                  }).toString()
                }
              />{" "}
              {account}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
