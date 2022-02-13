import * as React from "react";
import { Link } from "gatsby";
import ReactMarkdown from 'react-markdown'
import { Navbar, Container, Nav, NavDropdown, Button, Row, Col, Card, Image} from 'react-bootstrap';


import logo from "../img/logo.svg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";

const Footer = class extends React.Component {
  render() {
    var meta = this.props.metadata;
    return (
      <>
       <footer>
        <Navbar expand="lg">
          <Container>
            {/* <Logo size="long" color="white" meta={meta}></Logo> */}
            <main className="top">
              <div>
                <ReactMarkdown>{meta.contact.info}</ReactMarkdown>
              </div>
              <div>
                <ReactMarkdown>{meta.contact.contact}</ReactMarkdown>
              </div>
              <div className="footernav">
                <nav>
                  {meta.menu.map((item, i)=> <Link className="navbar-item" to={item.to} key={"footermainnav-"+i}>{item.name}</Link>)}
                </nav>
                <nav>
                  {meta.footermenu.map((item, i)=> <Link className="navbar-item" to={item.to} key={"footernav-"+i}>{item.name}</Link>)}
                </nav>
              </div>
              <p className="copyright top">Alle Rechte vorbehalten. © Copyright {new Date().getFullYear()}</p>
            </main>
          </Container>
        </Navbar>
      </footer>
        
      </>
      
    );
  }
};

export default Footer;
