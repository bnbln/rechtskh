import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Container } from "react-bootstrap";

import PreviewCompatibleImage from "./PreviewCompatibleImage";
import { MailIcon } from "./Icons";

export const Breadcrumbs = ({ items, dark = false }) => (
  <nav
    className={`breadcrumbs${dark ? " breadcrumbs--dark" : ""}`}
    aria-label="Brotkrümelnavigation"
  >
    <Link to="/">Start</Link>
    {items.map((item) => (
      <React.Fragment key={`${item.label}-${item.to || "current"}`}>
        <span aria-hidden="true">/</span>
        {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
      </React.Fragment>
    ))}
  </nav>
);

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ).isRequired,
  dark: PropTypes.bool,
};

export const SplitHero = ({
  title,
  lead,
  eyebrow,
  image,
  imageAlt,
  children,
  imagePosition = "center",
  imageFirst = false,
  compact = false,
  backgroundMedia = false,
  showBreadcrumbs = true,
}) => (
  <section
    className={`splitHero${imageFirst ? " splitHero--imageFirst" : ""}${
      compact ? " splitHero--compact" : ""
    }${backgroundMedia ? " splitHero--backgroundMedia" : ""}`}
  >
    <Container>
      {showBreadcrumbs ? <Breadcrumbs items={[{ label: title }]} dark /> : null}
      <div className="splitHeroGrid">
        <div className="splitHeroCopy">
          {eyebrow ? <p className="splitHeroEyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          {lead ? <p className="splitHeroLead">{lead}</p> : null}
          {children}
        </div>
        <div className="splitHeroMedia">
          <PreviewCompatibleImage
            imageInfo={{
              image,
              alt: imageAlt || title,
              loading: "eager",
              fetchPriority: "high",
              sizes: "(max-width: 991px) 100vw, 50vw",
              style: { objectPosition: imagePosition },
            }}
          />
        </div>
      </div>
    </Container>
  </section>
);

SplitHero.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  eyebrow: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  imageAlt: PropTypes.string,
  imagePosition: PropTypes.string,
  imageFirst: PropTypes.bool,
  compact: PropTypes.bool,
  backgroundMedia: PropTypes.bool,
  showBreadcrumbs: PropTypes.bool,
  children: PropTypes.node,
};

export const SimplePageHeader = ({ title, lead, eyebrow }) => (
  <header className="simplePageHeader">
    <Container>
      <Breadcrumbs items={[{ label: title }]} dark />
      {eyebrow ? <p className="sectionEyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {lead ? <p>{lead}</p> : null}
    </Container>
  </header>
);

SimplePageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  eyebrow: PropTypes.string,
};

export const InlineContactCta = ({
  title = "Jetzt Kontakt aufnehmen",
  text = "Wir melden uns umgehend zurück.",
}) => (
  <aside className="inlineContactCta">
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
    <Link className="btn btn-primary" to="/kontakt/">
      <MailIcon size={15} />
      Zum Kontaktformular
    </Link>
  </aside>
);

InlineContactCta.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export const PracticeLinks = ({ current }) => {
  const areas = ["Mietrecht", "Verkehrsrecht", "Versicherungsrecht"];
  return (
    <aside className="sidebarCard sidebarCard--tint">
      <h2 className="sidebarTitle">Weitere Rechtsgebiete</h2>
      <div className="sidebarLinks">
        {areas
          .filter((area) => area !== current)
          .map((area) => (
            <Link key={area} to={`/recht/${area.toLowerCase()}/`}>
              {area} →
            </Link>
          ))}
      </div>
    </aside>
  );
};

PracticeLinks.propTypes = {
  current: PropTypes.string,
};
