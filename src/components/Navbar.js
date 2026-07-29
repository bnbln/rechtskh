import React from "react";
import { Link } from "gatsby";
import { Container } from "react-bootstrap";
import {
  ChevronDownIcon,
  MailIcon,
  ThreeBarsIcon,
  XIcon,
} from "@primer/octicons-react";

const normalizeTarget = (target) =>
  target?.startsWith("/") ? target : `/${target || ""}`;

const Navigation = ({ metadata }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const closeMenus = (event) => {
    event?.currentTarget?.blur();
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const NavLink = ({ className = "", to, children }) => (
    <Link
      className={`nav-link ${className}`.trim()}
      onClick={closeMenus}
      to={to}
    >
      {children}
    </Link>
  );

  const practiceLinks = (
    <>
      <NavLink className="light" to="/recht/versicherungsrecht/">
        Versicherungsrecht
      </NavLink>
      <NavLink className="light" to="/recht/verkehrsrecht/">
        Verkehrsrecht
      </NavLink>
      <NavLink className="light" to="/recht/mietrecht/">
        Mietrecht
      </NavLink>
    </>
  );

  return (
    <nav className="navigationWrapper" aria-label="Hauptnavigation">
      <Container>
        <div className="navigation">
          <div className="d-flex">
            <NavLink to="/" className="nav-link-brand">
              <span className="navbar-brand">{metadata.site}</span>
            </NavLink>

            <div className="d-none d-lg-flex">
              {metadata.menu.map((item) => {
                if (item.to === "DROPDOWN") {
                  return (
                    <button
                      key={item.name}
                      className="nav-link"
                      type="button"
                      aria-expanded={dropdownOpen}
                      aria-controls="practice-dropdown"
                      onClick={() => setDropdownOpen((open) => !open)}
                    >
                      {item.name} <ChevronDownIcon aria-hidden="true" />
                    </button>
                  );
                }

                return (
                  <NavLink key={item.name} to={normalizeTarget(item.to)}>
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <Link
            to="/kontakt/"
            className="btn btn-outline-light btn-sm d-none d-lg-flex"
          >
            <MailIcon aria-hidden="true" />
            <span>Kontakt aufnehmen</span>
          </Link>

          <button
            id="toggleMenu"
            type="button"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="mobile-menu-toggle d-flex d-lg-none"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <XIcon size={24} aria-hidden="true" />
            ) : (
              <ThreeBarsIcon size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {dropdownOpen && (
        <div id="practice-dropdown" className="dropdown d-none d-lg-block">
          <Container>{practiceLinks}</Container>
        </div>
      )}

      {menuOpen && (
        <div id="mobile-navigation" className="mobileNav d-lg-none">
          <Container>
            <div className="mobileNavLinks">
              {metadata.menu.map((item) =>
                item.to === "DROPDOWN" ? (
                  <div className="mobilePracticeLinks" key={item.name}>
                    <span className="mobileNavHeading">Rechtsgebiete</span>
                    {practiceLinks}
                  </div>
                ) : (
                  <NavLink key={item.name} to={normalizeTarget(item.to)}>
                    {item.name}
                  </NavLink>
                )
              )}
              <Link
                to="/kontakt/"
                className="btn btn-outline-lightsecondary"
                onClick={closeMenus}
              >
                <MailIcon aria-hidden="true" />
                <span>Kontakt aufnehmen</span>
              </Link>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
