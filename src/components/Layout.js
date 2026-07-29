import React from "react";

import "../../global.css";
import "./theme.scss";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useSiteMetadata from "./SiteMetadata";

const TemplateWrapper = ({ children }) => {
  const meta = useSiteMetadata();
  return (
    <div>
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <Navbar metadata={meta} />
      <main id="main-content" className="pageWrapper">{children}</main>
      <Footer metadata={meta} />
    </div>
  );
};

export default TemplateWrapper;
