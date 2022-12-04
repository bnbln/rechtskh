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
              <Col md={12} className="footernav">
              <Navbar.Brand onClick={()=> navigate("/")} style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "white"
                }}>{meta.site}</Navbar.Brand>
              <h4 style={{fontWeight: 300, marginBottom: "2rem"}}>{meta.description}</h4>
              </Col>
            </Row>
            <Row>
            <Col md={5}>
                <ReactMarkdown>{meta.contact.contact}</ReactMarkdown>
                <ReactMarkdown>{meta.contact.info}</ReactMarkdown>
              </Col>
              <Col md={6} className="footernav">
              
                <nav style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: "2rem"
                }}>
                  {meta.menu.map((item, i)=> {
                    if (item.to === "DROPDOWN") {
                      return(
                        <>
                        <Link className="navbar-item" to={"/recht/mietrecht"} key={"footermainnav-"+i} style={{
                          color: "white"
                        }}>Mietrecht</Link>
                        <Link className="navbar-item" to={"/recht/verkehrsrecht"} key={"footermainnav-"+i} style={{
                          color: "white"
                        }}>Verkehrsrecht</Link>
                        <Link className="navbar-item" to={"/recht/versicherungsrecht"} key={"footermainnav-"+i} style={{
                          color: "white"
                        }}>Versicherungsrecht</Link>
                        </>
                      )
                    } else {
                      return(
                        <Link className="navbar-item" to={item.to} key={"footermainnav-"+i} style={{
                          color: "white"
                        }}>{item.name}</Link>
                      )
                    }
                  })}
                </nav>
                <nav style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: "2rem"
                }}>
                  {meta.footermenu.map((item, i)=> <Link className="navbar-item" to={item.to} key={"footernav-"+i} style={{
                    color: "white"
                  }}>{item.name}</Link>)}
                </nav>
              </Col>
             
              
              
              <p className="copyright top" style={{textAlign: "center", paddingTop: 100}}>Alle Rechte vorbehalten. © Copyright {new Date().getFullYear()}</p>
            </Row>
          </Container>
      </footer>
        
      </>
      
    );
  }
};

export default Footer;
