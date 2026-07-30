import React from "react";

import "../../global.css";
import "./theme.scss";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useSiteMetadata from "./SiteMetadata";

const TemplateWrapper = ({ children, isHome = false }) => {
  const meta = useSiteMetadata();
  return (
    <div>
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <Navbar metadata={meta} isHome={isHome} />
      <main
        id="main-content"
        className={`pageWrapper${isHome ? " pageWrapper--home" : ""}`}
      >
        {children}
      </main>
      <Footer metadata={meta} />
    </div>
  );
};

export default TemplateWrapper;
