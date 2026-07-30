import React from "react";
import { Link } from "gatsby";
import { Container } from "react-bootstrap";
import {
  ChevronDownIcon,
  ThreeBarsIcon,
  XIcon,
} from "@primer/octicons-react";

import { MailIcon, practiceIcon } from "./Icons";

const normalizeTarget = (target) =>
  target?.startsWith("/") ? target : `/${target || ""}`;

const practiceAreas = [
  {
    name: "Versicherungsrecht",
    to: "/recht/versicherungsrecht/",
    description: "Ansprüche gegenüber Versicherern klar durchsetzen.",
  },
  {
    name: "Verkehrsrecht",
    to: "/recht/verkehrsrecht/",
    description: "Unfall, Haftung und Schadensregulierung.",
  },
  {
    name: "Mietrecht",
    to: "/recht/mietrecht/",
    description: "Mietvertrag, Kündigung, Mängel und Räumung.",
  },
];

const Navigation = ({ metadata, isHome = false }) => {
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
      {practiceAreas.map((area) => (
        <NavLink className="light" key={area.name} to={area.to}>
          {area.name}
        </NavLink>
      ))}
    </>
  );

  const desktopPracticeMenu = (
    <div id="practice-dropdown" className="practiceMenu d-none d-lg-block">
      <div className="practiceMenuPanel">
        <div className="practiceMenuIntro">
          <span>Rechtsgebiete</span>
          <p>Persönliche Beratung und eine klare Strategie für Ihren Fall.</p>
        </div>
        <div className="practiceMenuGrid">
          {practiceAreas.map((area) => {
            const Icon = practiceIcon(area.name);

            return (
              <NavLink
                className="practiceMenuLink"
                key={area.name}
                to={area.to}
              >
                <span className="practiceMenuIcon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <span>
                  <strong>{area.name}</strong>
                  <small>{area.description}</small>
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <nav
      className={`navigationWrapper${
        isHome ? " navigationWrapper--home" : ""
      }`}
      aria-label="Hauptnavigation"
    >
      <Container>
        <div className="navigation">
          <div className="d-flex">
            <NavLink to="/" className="nav-link-brand">
              <span className="navbar-brand">{metadata.site}</span>
            </NavLink>

            <div className="homeDesktopNav d-none d-lg-flex">
              {metadata.menu
                .filter((item) => item.name !== "Home")
                .map((item) => {
                  if (item.to === "DROPDOWN") {
                    return (
                      <div className="desktopPracticeMenuWrap" key={item.name}>
                        <button
                          className="nav-link"
                          type="button"
                          aria-expanded={dropdownOpen}
                          aria-controls="practice-dropdown"
                          onClick={() => setDropdownOpen((open) => !open)}
                        >
                          {item.name} <ChevronDownIcon aria-hidden="true" />
                        </button>
                        {dropdownOpen ? desktopPracticeMenu : null}
                      </div>
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
            className="btn btn-outline-on-navy btn-sm d-none d-lg-flex"
          >
            <MailIcon size={15} />
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
                className="btn btn-primary mobileNavCta"
                onClick={closeMenus}
              >
                <MailIcon size={16} />
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
