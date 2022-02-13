import React from "react";
import { Link } from "gatsby";
import { Navbar, Container, Nav, NavDropdown, Button, Row, Col, Card, Image} from 'react-bootstrap';

import logo from "../img/logo.svg";

const Navigation = class extends React.Component {
  render() {
    return (
      <>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="#home">
            <Link to="/" className="navbar-item" title="Logo">
              {/* <img src={logo} alt="Kaldi" style={{ width: "88px" }} /> */}
              Rechtsklarheit.de
            </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="Rechtsfragen" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Versicherungsrecht</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Verkehrstrecht</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Mietrecht</NavDropdown.Item>
                  <NavDropdown.Divider />
                   <Link className="navbar-item" to="/about">
                    About
                  </Link>
                  <Link className="navbar-item" to="/products">
                    Products
                  </Link>
                  <Link className="navbar-item" to="/blog">
                    Blog
                  </Link>
                  <Link className="navbar-item" to="/contact">
                    Contact
                  </Link>
                  <Link className="navbar-item" to="/contact/examples">
                    Form Examples
                  </Link>
                  <NavDropdown.Item href="#action/3.4">Strafrecht</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#anwalt">Anwalt</Nav.Link>
                <Nav.Link href="#aktuelles">Aktuelles</Nav.Link>
              </Nav>
              <Button variant="outline-primary">Kontakt aufnehmen</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
};

export default Navigation;