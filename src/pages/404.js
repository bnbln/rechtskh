import * as React from "react";
import { Link } from "gatsby";
import { Container } from "react-bootstrap";
import Layout from "../components/Layout";
import { SimplePageHeader } from "../components/PageElements";
import Seo from "../components/Seo";

const NotFoundPage = () => (
  <Layout>
    <SimplePageHeader
      title="Seite nicht gefunden"
      eyebrow="Fehler 404"
      lead="Die aufgerufene Unterseite existiert nicht oder wurde verschoben."
    />
    <Container className="statusPage">
      <p>
        Über die Startseite oder unsere Rechtsgebiete finden Sie schnell wieder
        zum gesuchten Thema.
      </p>
      <div className="statusActions">
        <Link className="btn btn-primary" to="/">
          Zur Startseite
        </Link>
        <Link className="btn btn-outline-navy" to="/kontakt/">
          Kontakt aufnehmen
        </Link>
      </div>
    </Container>
  </Layout>
);

export default NotFoundPage;

export const Head = ({ location }) => (
  <Seo
    title="Seite nicht gefunden"
    description="Die angeforderte Seite wurde nicht gefunden."
    pathname={location.pathname}
    noindex
  />
);
