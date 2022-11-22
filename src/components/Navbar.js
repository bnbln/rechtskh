import React from "react";
import { navigate } from "gatsby";
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import {MailIcon, ThreeBarsIcon} from '@primer/octicons-react'

const Navigation = class extends React.Component {
  render() {
    const meta = this.props.metadata;
    // console.log("meta ", meta);
    return (
      <>
        <Navbar expand="lg" variant="light" fixed="top" style={{
                //boxShadow: "rgb(24 34 64) 0px -40px 80px -20px",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                backgroundColor: "rgb(255 255 255 / 100%)",
                // backdropFilter: "blur(15px)",
                // WebkitBackdropFilter: "blur(15px)"
              }}>
          <Container>
            <Navbar.Brand onClick={()=> navigate("/")} style={{color: "#324c8b", cursor: "pointer", marginRight: "2rem"}}>
              Rechtsklarheit.de    
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{
              border: "0px",
              padding: 0,
              margin: 0
            }}>
              <ThreeBarsIcon size='20px' fill="rgb(50, 76, 139)" />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-lg-auto" style={{gap: 8}}>
                {meta.menu.map((item, i)=> {
                  if (item.to === "DROPDOWN") {
                    return (
                      <NavDropdown title="Schwerpunkte" id="basic-nav-dropdown" key={"menu-item-"+i}>
                        <NavDropdown.Item onClick={()=> navigate("/recht/versicherungsrecht")}>Versicherungsrecht</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=> navigate("/recht/verkehrsrecht")}>Verkehrsrecht</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=> navigate("/recht/mietrecht")}>Mietrecht</NavDropdown.Item>
                      </NavDropdown>
                    )
                  } else {
                    return(
                      <Nav.Link key={"menu-item-"+i} onClick={()=> navigate(item.to)}>{item.name}</Nav.Link>
                    )
                  }
                })}
              </Nav>
              <Button variant="outline-secondary" size="sm" onClick={()=> navigate("/kontakt")}><div style={{marginRight: 8, display: "initial"}}><MailIcon /></div> Kontakt aufnehmen</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
};

export default Navigation;