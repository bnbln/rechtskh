import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { Container } from "react-bootstrap";

import Layout from "../components/Layout";
import Content, { HTMLContent, remapHeadings } from "../components/Content";
import { PracticeLinks, SplitHero } from "../components/PageElements";
import Seo from "../components/Seo";

export const AboutPageTemplate = ({
  title,
  subtitle,
  lead,
  image,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;
  return (
    <>
      <SplitHero
        title={title}
        lead={lead}
        eyebrow={subtitle}
        image={image}
        imageAlt="Rechtsanwalt Tarik Sharief"
        imagePosition="center 25%"
        imageFirst
        showBreadcrumbs={false}
      >
        <Link className="btn btn-primary" to="/kontakt/">
          Zum Kontaktformular
        </Link>
      </SplitHero>

      <Container className="subpageContent">
        <div className="contentWithSidebar">
          <div>
            <PageContent className="richContent promotedHeadings" content={content} />
          </div>
          <div className="sidebarStack">
            <aside className="sidebarCard">
              <h2 className="sidebarTitle">Kanzlei</h2>
              <p>
                <strong>Rechtsanwalt Tarik Sharief</strong>
                <br />
                Ansbacher Straße 13
                <br />
                10787 Berlin
              </p>
              <p>
                <a href="tel:+493069533361">030 – 69 53 33 61</a>
                <br />
                <a href="mailto:kanzlei@rechtsklarheit.de">
                  kanzlei@rechtsklarheit.de
                </a>
              </p>
              <Link className="btn btn-outline-navy btn-sm" to="/kontakt/">
                Kontakt & Standort →
              </Link>
            </aside>
            <PracticeLinks />
          </div>
        </div>
      </Container>
    </>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  subtitle: PropTypes.string,
  lead: PropTypes.string,
  image: PropTypes.object,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.featuredimage}
        subtitle={post.frontmatter.subtitle}
        lead={post.frontmatter.lead}
        content={remapHeadings(post.html, { 3: 2 })}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const Head = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Seo
      title={frontmatter.title}
      description={frontmatter.lead}
      pathname={location.pathname}
      image={frontmatter.featuredimage.publicURL}
    />
  );
};

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        lead
        featuredimage {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 720, quality: 70, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
