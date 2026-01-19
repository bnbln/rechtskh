import React from "react";
import PropTypes from "prop-types";
import { navigate, graphql } from "gatsby";
import { Container, Button, Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import BlogRoll from "../components/BlogRoll";
import RechtRoll from "../components/RechtRoll";
import Layout from "../components/Layout";

export const IndexPageTemplate = ({ hero, rechtsgebiete, settings }) => {
  return (
    <>
      {/* ==================== */}
      {/* HERO SECTION         */}
      {/* ==================== */}

      {/* Mobile Hero */}
      <section className="hero-section hero-mobile d-block d-lg-none">
        <Container>
          <div className="hero-inner">
            <div className="hero-image-wrapper">
              <PreviewCompatibleImage
                imageInfo={{
                  image: hero.images[0].image,
                  alt: hero.images[0].title,
                }}
              />
            </div>

            <div className="hero-glass-panel">
              <p className="hero-name">{hero.images[0].title}</p>
              <h1>{hero.title}</h1>
              <p className="lead">{hero.lead}</p>
              <Button
                className="btn-solid-primary"
                onClick={() => navigate(hero.cta.link)}
              >
                {hero.cta.text}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Desktop Hero */}
      <section className="hero-section d-none d-lg-block">
        <Container>
          <div className="hero-inner">
            <div className="hero-image-wrapper">
              <PreviewCompatibleImage
                imageInfo={{
                  image: hero.images[0].image,
                  alt: hero.images[0].title,
                }}
              />
            </div>

            <div className="hero-glass-panel">
              <p className="hero-name">{hero.images[0].title}</p>
              <h1>{hero.title}</h1>
              <p className="lead">{hero.lead}</p>
              <Button
                className="btn-solid-primary"
                onClick={() => navigate(hero.cta.link)}
              >
                {hero.cta.text}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================== */}
      {/* PRACTICE AREAS       */}
      {/* ==================== */}
      <section className="practice-section">
        <Container>
          <div className="section-header">
            <h2>Schwerpunkte</h2>
            <p>{rechtsgebiete.lead}</p>
          </div>
        </Container>
        <div className="practice-cards-wrapper">
          <Container>
            <RechtRoll rechtsbereiche={rechtsgebiete.lead} />
          </Container>
        </div>
      </section>

      {/* ==================== */}
      {/* CONTACT SECTION      */}
      {/* ==================== */}
      <section className="contact-liquid">
        <a
          className="map-background"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.google.com/maps/place/Rechtsanwalt+Tarik+Sharief/@52.50342,13.3411114,17z/data=!3m1!4b1!4m5!3m4!1s0x47a850547a59cbff:0x4097aa41c581420e!8m2!3d52.50342!4d13.3433001"
        >
          <PreviewCompatibleImage
            imageInfo={{
              image: settings.contact.map,
              alt: "Karte",
              style: {
                height: "100%",
                width: "100%",
              },
            }}
          />
        </a>
        <Container>
          <div className="liquid-glass-dark contact-panel">
            <h2>{settings.description}</h2>
            <ReactMarkdown>{settings.contact.info}</ReactMarkdown>
            <div className="contact-details">
              <ReactMarkdown>{settings.contact.contact}</ReactMarkdown>
            </div>
            <Button
              className="btn-solid-primary"
              onClick={() => navigate("/kontakt")}
            >
              Kontakt aufnehmen
            </Button>
          </div>
        </Container>
      </section>

      {/* ==================== */}
      {/* CONTACT BANNER       */}
      {/* ==================== */}
      <section className="banner-liquid bg-gradient-radial">
        <Container>
          <Row className="justify-content-center align-items-center" style={{ gap: '1.5rem' }}>
            <Col md="auto">
              <h2 style={{ marginBottom: 0 }}>Jetzt Kontakt aufnehmen</h2>
            </Col>
            <Col md="auto">
              <Button className="btn-solid-primary" onClick={() => navigate("/kontakt")}>
                Zum Kontaktformular
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ==================== */}
      {/* BLOG / AKTUELLES     */}
      {/* ==================== */}
      <section className="bg-deep-blue" style={{ padding: '4rem 0' }}>
        <Container>
          <div className="liquid-pill section-label" style={{ marginBottom: '2rem' }}>Aktuelles</div>
          <BlogRoll all={false} />
        </Container>
      </section>
    </>
  );
};

IndexPageTemplate.propTypes = {
  hero: PropTypes.object,
  rechtsgebiete: PropTypes.object,
  settings: PropTypes.object,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  //console.log(frontmatter.hero);
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

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        hero {
          images {
            title
            image {
              childImageSharp {
                gatsbyImageData(width: 1920, quality: 100, layout: CONSTRAINED)
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
          description
          contact {
            map {
              childImageSharp {
                gatsbyImageData(width: 720, quality: 70, layout: CONSTRAINED)
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
