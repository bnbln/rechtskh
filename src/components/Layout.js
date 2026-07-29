import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

// import 'bootstrap/dist/css/bootstrap.min.css';
import "./theme.scss";

import useWindowSize from "./getWindow";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ children }) => {
  const meta = useSiteMetadata();

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }, []);
  const width = useWindowSize()
  return (
    <div>
      <Helmet>
        <html lang="de" />
        <title>{meta.site + " - " + meta.description}</title>
        <meta name="description" content={meta.seo} />

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
        <meta name="theme-color" content="#172340" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={meta.site} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar metadata={meta} mobile={width > 991 ? false : true} />
      <div className="pageWrapper">{children}</div>
      <Footer metadata={meta} />
    </div>
  );
};

export default TemplateWrapper;
