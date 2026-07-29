import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { Card, Col, Container, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import BlogRoll from "../components/BlogRoll";
import { CarouselWrapper } from "../components/CarouselWrapper";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import RechtRoll from "../components/RechtRoll";
import Seo from "../components/Seo";

export const IndexPageTemplate = ({ hero, rechtsgebiete, settings }) => (
  <>
    <section className="homeHero">
      <Container>
        <Row className="homeHeroRow">
          <Col lg={8} className="homeHeroMedia">
            <div className="homeHeroDesktopMedia">
              <CarouselWrapper images={hero.images} />
            </div>
            <div className="homeHeroOverlay" aria-hidden="true" />
          </Col>
          <Col lg={4} className="homeHeroContent">
            <p className="homeHeroEyebrow">{hero.images[0].title}</p>
            <h1>{hero.title}</h1>
            <p className="lead">{hero.lead}</p>
            <Link className="btn btn-primary btn-lg" to={hero.cta.link}>
              {hero.cta.text}
            </Link>
          </Col>
        </Row>
      </Container>
    </section>

    <section
      aria-labelledby="practice-areas-title"
      style={{ background: "#172340", paddingTop: 40, paddingBottom: 40 }}
    >
      <Container fluid="sm">
        <RechtRoll
          headingId="practice-areas-title"
          rechtsbereiche={rechtsgebiete.lead}
        />
      </Container>
    </section>

    <section className="locationSection" aria-labelledby="location-title">
      <a
        className="locationMapLink"
        target="_blank"
        rel="noreferrer"
        href="https://www.google.com/maps/place/Rechtsanwalt+Tarik+Sharief/@52.50342,13.3411114,17z/data=!3m1!4b1!4m5!3m4!1s0x47a850547a59cbff:0x4097aa41c581420e!8m2!3d52.50342!4d13.3433001"
        aria-label="Kanzleistandort in Google Maps öffnen"
      >
        <PreviewCompatibleImage
          imageInfo={{
            image: settings.contact.map,
            alt: "Karte mit dem Kanzleistandort am Wittenbergplatz",
            loading: "lazy",
            style: { height: "100%", width: "100%" },
          }}
        />
      </a>
      <Container className="locationContent">
        <Row>
          <Col md={6} lg={4}>
            <Card className="locationCard">
              <Card.Body>
                <h2 className="sectionHeading" id="location-title">
                  {settings.description}
                </h2>
                <ReactMarkdown>{settings.contact.info}</ReactMarkdown>
                <ReactMarkdown>{settings.contact.contact}</ReactMarkdown>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>

    <section className="bg-scnd" aria-labelledby="contact-cta-title">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md="auto">
            <h2 id="contact-cta-title">Jetzt Kontakt aufnehmen</h2>
          </Col>
          <Col md="auto">
            <Link className="btn btn-primary" to="/kontakt/">
              Zum Kontaktformular
            </Link>
          </Col>
        </Row>
      </Container>
    </section>

    <section aria-labelledby="latest-title">
      <Container style={{ marginTop: "3rem" }}>
        <h2 className="sectionHeading" id="latest-title">
          Aktuelles
        </h2>
        <BlogRoll all={false} headingLevel={3} />
      </Container>
    </section>
  </>
);

IndexPageTemplate.propTypes = {
  hero: PropTypes.object,
  rechtsgebiete: PropTypes.object,
  settings: PropTypes.object,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <IndexPageTemplate
        hero={frontmatter.hero}
        rechtsgebiete={frontmatter.rechtsgebiete}
        settings={frontmatter.settings}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const Head = ({ data, location }) => {
  const { hero, settings } = data.markdownRemark.frontmatter;
  return (
    <Seo
      title={settings.site}
      description={`${hero.lead}. ${hero.title}.`}
      pathname={location.pathname}
      image={settings.image.publicURL}
    />
  );
};

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        hero {
          images {
            title
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 1280
                  quality: 65
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            link
          }
          title
          lead
          cta {
            text
            link
          }
        }
        rechtsgebiete {
          lead
          category
        }
        settings {
          site
          seo
          description
          image {
            publicURL
          }
          contact {
            map {
              childImageSharp {
                gatsbyImageData(
                  width: 1280
                  quality: 70
                  layout: CONSTRAINED
                  placeholder: BLURRED
                )
              }
            }
            info
            contact
            open
            image {
              childImageSharp {
                gatsbyImageData(width: 720, quality: 70, layout: CONSTRAINED)
              }
            }
            bu
          }
        }
      }
    }
  }
`;
