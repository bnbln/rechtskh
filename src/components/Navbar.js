import React from "react";
import { navigate, Link } from "gatsby";
import { Container, Button } from "react-bootstrap";
import {
  MailIcon,
  ThreeBarsIcon,
  XIcon,
  ChevronDownIcon,
} from "@primer/octicons-react";

import { motion } from "framer-motion";

const variants = {
  open: { height: "100vh" },
  closed: { height: "auto" },
};

const container = {
  hidden: {
    translateY: -72,
  },
  show: {
    translateY: 0,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.06,
    },
  },
  out: {
    translateY: -72,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};
const item = {
  hidden: { opacity: 0, translateY: -100 },
  show: { opacity: 1, translateY: 0 },
  out: { opacity: 0, translateY: -100 },
};

const Navigation = ({ metadata, mobile }) => {
  const [status, setStatus] = React.useState(false);
  const [dropdown, setDropdown] = React.useState(false);

  const NavLink = ({ className, style, color, to, children }) => {
    return (
      <Link
        style={{
          ...style,
          color: color ? color : "",
        }}
        className={"nav-link "+className}
        onClick={() => handleNavigation()}
        to={to}
      >
        {children}
      </Link>
    );
  };
  const NavDropdown = ({ children }) => {
    return (
      <button
        
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        className="nav-link"
        onClick={() => setDropdown(!dropdown)}
      >
        {children} <ChevronDownIcon />
      </button>
    );
  };
  function openMenu(e) {
    setStatus(!status);
  }
  function handleNavigation(e) {
    setStatus(false);
    setDropdown(false);
  }

  return (
    <>
      { //Desktop Dropdown
      !mobile && dropdown && (
        <motion.div className="dropdown" initial="hidden" animate="show" exit="out" variants={container}>
          <Container>
            <motion.div variants={item}>
              <NavLink className="light" color={"white"} to={"/recht/versicherungsrecht"}>
                Versicherungsrecht
              </NavLink>
            </motion.div>
            <motion.div variants={item}>
              <NavLink className="light" color={"white"} to={"/recht/verkehrsrecht"}>
                Verkehrsrecht
              </NavLink>
            </motion.div>
            <motion.div variants={item}>
              <NavLink className="light" color={"white"} to={"/recht/mietrecht"}>
                Mietrecht
              </NavLink>
            </motion.div>
          </Container>
        </motion.div>
      )}

      {/* Nav */}
      <motion.nav
        className="navigationWrapper"
        animate={mobile && status ? "open" : "closed"}
        variants={variants}
        transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
      >
        <Container>
          <div className="navigation" >
            <div className="d-flex">
              <NavLink to={"/"} style={{padding: 0, background: "white"}}>
                <h1 className="navbar-brand">{metadata.site}</h1>
              </NavLink>
              <div
                className="d-none d-lg-flex"
                style={{ display: "flex", gap: 8 }}
              >
                {metadata.menu.map((item, i) => {
                  if (item.to === "DROPDOWN") {
                    return (
                      <NavDropdown key={"menu-item-" + i}>
                        {item.name}
                      </NavDropdown>
                    );
                  } else {
                    return (
                      <NavLink key={"menu-item-" + i} to={item.to}>
                        {item.name}
                      </NavLink>
                    );
                  }
                })}
              </div>
            </div>
            <Button
              className="d-none d-lg-flex"
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/kontakt")}
            >
              <div style={{ marginRight: 8, display: "initial" }}>
                <MailIcon />
              </div>{" "}
              Kontakt aufnehmen
            </Button>
            <button
              id="toggleMenu" aria-label={status === false ? "Menü öffnen" : "Menü schließen"}
              className="d-block d-lg-none "
              style={{
                margin: 0,
                padding: 0,
                border: 0,
                background: "none",
                outline: 0,
              }}
              onClick={openMenu}
            >
              {status === true ? (
                <XIcon size="24px" fill="rgb(50, 76, 139)" />
              ) : (
                <ThreeBarsIcon size="24px" fill="rgb(50, 76, 139)" />
              )}
            </button>
          </div>
        </Container>

        {status && (
          <div
            className="mobileNav"
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Container
              className="d-flex d-lg-none "
              style={{
                height: "100%",
                paddingBottom: 144,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 72
              }}
            >
              <div
                style={{
                  gap: 8,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                
                {metadata.menu.map((item, i) => {
                  if (item.to === "DROPDOWN") {
                    return (
                      <div className="dropdown">
                        <h2>Schwerpunkte</h2>
                        <NavLink
                          to={"/recht/versicherungsrecht"}
                        >
                          Versicherungsrecht
                        </NavLink>
                        <NavLink to={"/recht/verkehrsrecht"}>
                          Verkehrsrecht
                        </NavLink>
                        <NavLink to={"/recht/mietrecht"}>
                          Mietrecht
                        </NavLink>
                      </div>
                    );
                  } else {
                    return (
                      <NavLink key={"menu-item-" + i} to={item.to}>
                        {item.name}
                      </NavLink>
                    );
                  }
                })}
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/kontakt")}
                >
                  <div style={{ marginRight: 8, display: "initial" }}>
                    <MailIcon />
                  </div>{" "}
                  Kontakt aufnehmen
                </Button>
              </div>
            </Container>
          </div>
        )}


      </motion.nav>
    </>
  );
};

export default Navigation;
