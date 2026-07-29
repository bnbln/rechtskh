import * as React from "react";
import { Link } from "gatsby";
import ReactMarkdown from "react-markdown";
import { Container, Col, Row } from "react-bootstrap";

const Footer = class extends React.Component {
  render() {
    var meta = this.props.metadata;
    return (
      <>
        <footer style={{ padding: "40px 0px" }}>
          <Container>
            <Row>
              <Col md={12} className="footernav">
                <Link
                  to="/"
                  className="footer-brand"
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  {meta.site}
                </Link>
                <p className="footer-description">
                  {meta.description}
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <ReactMarkdown>{meta.contact.contact}</ReactMarkdown>
                <ReactMarkdown>{meta.contact.info}</ReactMarkdown>
              </Col>
              <Col md={6} className="footernav">
                <nav
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginBottom: "2rem",
                  }}
                >
                  {meta.menu.map((item, i) => {
                    if (item.to === null) {
                      return (
                        <Link
                          className="navbar-item"
                          to={"/"}
                          key={"footermainnav-name-" + i + "-" + item.name}
                          style={{
                            color: "white",
                          }}
                        >
                          {item.name}
                        </Link>
                      );
                    }
                    if (item.to === "DROPDOWN") {
                      return (
                        <React.Fragment key={`footer-practice-${i}`}>
                          <Link
                            className="navbar-item"
                            to={"/recht/mietrecht"}
                            style={{
                              color: "white",
                            }}
                          >
                            Mietrecht
                          </Link>
                          <Link
                            className="navbar-item"
                            to={"/recht/verkehrsrecht"}
                            style={{
                              color: "white",
                            }}
                          >
                            Verkehrsrecht
                          </Link>
                          <Link
                            className="navbar-item"
                            to={"/recht/versicherungsrecht"}
                            style={{
                              color: "white",
                            }}
                          >
                            Versicherungsrecht
                          </Link>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <Link
                          className="navbar-item"
                          to={item.to.startsWith('/') ? item.to : "/" + item.to}
                          key={"footermainnav-name-" + i + "-" + item.name}
                          style={{
                            color: "white",
                          }}
                        >
                          {item.name}
                        </Link>
                      );
                    }
                  })}
                </nav>
                <nav
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginBottom: "2rem",
                  }}
                >
                  {meta.footermenu.map((item, i) => (
                    <Link
                      className="navbar-item"
                      to={item.to.startsWith('/') ? item.to : "/" + item.to}
                      key={"footernav-link-" + i + "-" + item.name}
                      style={{
                        color: "white",
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </Col>

              <p
                className="copyright top"
                style={{ textAlign: "center", paddingTop: 100 }}
              >
                Alle Rechte vorbehalten. © Copyright {new Date().getFullYear()}
              </p>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
};

export default Footer;
