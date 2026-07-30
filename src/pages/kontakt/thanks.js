import React from "react";
import { Link } from "gatsby";
import { Container } from "react-bootstrap";
import Layout from "../../components/Layout";
import { SimplePageHeader } from "../../components/PageElements";
import Seo from "../../components/Seo";

// eslint-disable-next-line
export default () => (
  <Layout>
    <SimplePageHeader
      title="Nachricht gesendet"
      eyebrow="Vielen Dank"
      lead="Ihre Nachricht ist bei uns eingegangen."
    />
    <Container className="statusPage">
      <p>
        Wir werden uns so schnell wie möglich mit Ihnen in Verbindung setzen.
        Bei dringenden Anliegen erreichen Sie uns telefonisch.
      </p>
      <div className="statusActions">
        <a className="btn btn-primary" href="tel:+493069533361">
          030 – 69 53 33 61
        </a>
        <Link className="btn btn-outline-navy" to="/">
          Zur Startseite
        </Link>
      </div>
    </Container>
  </Layout>
);

export const Head = ({ location }) => (
  <Seo
    title="Nachricht gesendet"
    description="Ihre Nachricht wurde an die Rechtsanwaltskanzlei Tarik Sharief übermittelt."
    pathname={location.pathname}
    noindex
  />
);
