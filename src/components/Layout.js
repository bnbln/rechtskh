import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
import { Container } from "react-bootstrap";

// import 'bootstrap/dist/css/bootstrap.min.css';
import "./theme.scss";

import metadata from "../../content/settings/global.yml";
import { initGA } from "./ga-utils";
import useWindowSize from "./getWindow";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ children }) => {
  // const { title, description } = useSiteMetadata();
  console.log("COOKIE: ", getCookieConsentValue("gdpr"), " ");
  //const gaID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
  const handleAcceptCookie = () => {
      initGA("G-FFL7JLHTD3");
  };
  const handleDeclineCookie = () => {
    //remove google analytics cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };
  useEffect(() => {
    const isConsent = getCookieConsentValue("gdpr");
    if (isConsent === "true") {
      handleAcceptCookie();
    }
  }, []);

  const width = useWindowSize()
  return (
    <div>
      <Helmet>
        <html lang="de" />
        <title>{metadata.site}</title>
        <meta name="description" content={metadata.description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={metadata.site} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar metadata={metadata} mobile={width > 991 ? false : true} />
      <div className="pageWrapper">{children}</div>
      <Footer metadata={metadata} />
      <Container>
        <CookieConsent
          enableDeclineButton
          location="bottom"
          buttonText="Alle Cookies akzeptieren"
          cookieName="gdpr"
          expires={150}
          disableStyles={true}
          declineButtonText="Notwendige Cookies akzeptieren"
          buttonClasses="btn btn-primary btn-sm"
          buttonWrapperClasses="buttonWrapperClasses"
          declineButtonClasses="btn btn-secondary btn-sm"
          contentClasses="contentClasses"
          onAccept={handleAcceptCookie}
          onDecline={handleDeclineCookie}
          style={{
            boxShadow: "black 0px 0px 150px",
            zIndex: "100",
          }}
        >
          <b>Diese Seite verwendet Cookies </b>
          <br />
          <span style={{ fontSize: 10 }}>
            Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren,
            Funktionen für soziale Medien anbieten zu können und die Zugriffe
            auf unsere Website zu analysieren.{" "}
            <Link to="/datenschutz" style={{ color: "white" }}>
              Weitere Informationen
            </Link>
          </span>
        </CookieConsent>
      </Container>
    </div>
  );
};

export default TemplateWrapper;
