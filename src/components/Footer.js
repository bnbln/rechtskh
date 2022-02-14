import * as React from "react";
import { Link, navigate } from "gatsby";
import ReactMarkdown from 'react-markdown'
import { Navbar, Container, Col, Row} from 'react-bootstrap';

const Footer = class extends React.Component {
  render() {
    var meta = this.props.metadata;
    return (
      <>
       <footer style={{
                  padding: "40px 0px"
                }}>
            <Container>
            <Row>
              <Col md={4} className="footernav">
              <Navbar.Brand onClick={()=> navigate("/")} style={{
                  fontSize: 24
                }}>Rechtsklarheit.de</Navbar.Brand>
              <h4>Kanzlei am Wittenbergplatz</h4>
                <nav>
                  {meta.menu.map((item, i)=> <Link className="navbar-item" to={item.to} key={"footermainnav-"+i}>{item.name}</Link>)}
                </nav>
                <nav>
                  {meta.footermenu.map((item, i)=> <Link className="navbar-item" to={item.to} key={"footernav-"+i}>{item.name}</Link>)}
                </nav>
              </Col>
              <Col md={4}>
                <ReactMarkdown>{meta.contact.info}</ReactMarkdown>
              </Col>
              <Col md={4}>
                <ReactMarkdown>{meta.contact.contact}</ReactMarkdown>
              </Col>
              
              <p className="copyright top" style={{textAlign: "center", paddingTop: 40, fontWeight: 100}}>Alle Rechte vorbehalten. © Copyright {new Date().getFullYear()}</p>
            </Row>
          </Container>
      </footer>
        
      </>
      
    );
  }
};

export default Footer;
