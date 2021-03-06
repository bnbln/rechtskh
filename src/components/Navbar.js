import React from "react";
import { navigate } from "gatsby";
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import {MailIcon} from '@primer/octicons-react'

const Navigation = class extends React.Component {
  render() {
    const meta = this.props.metadata;
    // console.log(meta);
    return (
      <>
        <Navbar expand="lg" bg="white" variant="light" fixed="top">
          <Container>
            <Navbar.Brand onClick={()=> navigate("/")} style={{color: "#324c8b", cursor: "pointer"}}>
           
              {/* <img src={logo} alt="Kaldi" style={{ width: "88px" }} /> */}
              Rechtsklarheit.de
          
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={()=> navigate("/")}>Home</Nav.Link>
                <NavDropdown title="Rechtsfragen" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={()=> navigate("/recht/versicherungsrecht")}>Versicherungsrecht</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=> navigate("/recht/verkehrsrecht")}>Verkehrstrecht</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=> navigate("/recht/mietrecht")}>Mietrecht</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={()=> navigate("/about")}>Anwalt</Nav.Link>
                <Nav.Link onClick={()=> navigate("/blog")}>Aktuelles</Nav.Link>
              </Nav>
              <Button variant="outline-secondary" size="sm" onClick={()=> navigate("/contact")}><div style={{marginRight: 8, display: "initial"}}><MailIcon /></div> Kontakt aufnehmen</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
};

export default Navigation;