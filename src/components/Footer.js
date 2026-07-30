import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Container, Col, Row } from "react-bootstrap";

const PRACTICE_LINKS = [
  { name: "Mietrecht", to: "/recht/mietrecht/" },
  { name: "Verkehrsrecht", to: "/recht/verkehrsrecht/" },
  { name: "Versicherungsrecht", to: "/recht/versicherungsrecht/" },
];

const normalizeTarget = (target) =>
  target?.startsWith("/") ? target : `/${target || ""}`;

// Three columns: brand blurb, Rechtsgebiete, Kanzlei. The "Rechtsgebiete"
// dropdown entry of the main menu is expanded into its three areas; every
// other main-menu entry joins the Kanzlei column alongside the footer menu.
const Footer = ({ metadata: meta }) => {
  const footerBlurb = (meta.footertext || "")
    .replace(meta.description || "", "")
    .replace(/^[\s—-]+/, "");
  const kanzleiLinks = [
    ...meta.menu
      .filter((item) => item.to && item.to !== "DROPDOWN")
      .map((item) => ({ name: item.name, to: normalizeTarget(item.to) })),
    ...meta.footermenu.map((item) => ({
      name: item.name,
      to: normalizeTarget(item.to),
    })),
  ];

  return (
    <footer>
      <Container>
        <Row className="gy-4">
          <Col md={5} lg={6}>
            <Link to="/" className="footer-brand">
              {meta.site}
            </Link>
            <p className="footer-office">{meta.description}</p>
            {meta.lawyerName ? (
              <p className="footer-lawyer">{meta.lawyerName}</p>
            ) : null}
            {footerBlurb ? (
              <p className="footer-description">{footerBlurb}</p>
            ) : null}
          </Col>

          <Col md={3} lg={3}>
            <nav className="footernav" aria-label="Rechtsgebiete">
              <span className="footerHeading">Rechtsgebiete</span>
              {PRACTICE_LINKS.map((item) => (
                <Link key={`footer-recht-${item.to}`} to={item.to}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </Col>

          <Col md={4} lg={3}>
            <nav className="footernav" aria-label="Kanzlei">
              <span className="footerHeading">Kanzlei</span>
              {kanzleiLinks.map((item) => (
                <Link key={`footer-kanzlei-${item.to}-${item.name}`} to={item.to}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </Col>
        </Row>

        <p className="copyright">
          Alle Rechte vorbehalten. © Copyright {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  metadata: PropTypes.shape({
    site: PropTypes.string,
    description: PropTypes.string,
    footertext: PropTypes.string,
    lawyerName: PropTypes.string,
    menu: PropTypes.array,
    footermenu: PropTypes.array,
  }).isRequired,
};

export default Footer;
