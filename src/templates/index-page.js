import React from "react";
import PropTypes from "prop-types";
import { Link, navigate, graphql } from "gatsby";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import { CarouselWrapper } from "../components/CarouselWrapper";
import BlogRoll from "../components/BlogRoll";
import RechtRoll from "../components/RechtRoll";
import Layout from "../components/Layout";

export const IndexPageTemplate = ({ hero, rechtsgebiete, settings }) => {
  return (
    <>
      {/* Mobile Hero */}
      <div
        className="d-block d-lg-none"
        style={{
          height: "720px",
          width: "100%",
          position: "relative",
        }}
      >
        <Container
          className="d-flex justify-content-end"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1,
            padding: " var(--bs-gutter-x, 0.75rem)",
            flexDirection: "column",
          }}
        >
          <Row>
            <Col>
              <h1
                style={{
                  color: "white",
                  fontWeight: "900",
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                }}
              >
                {hero.images[0].title}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <h1
                style={{
                  color: "white",
                  fontFamily: "Lato",
                  fontSize: "1.5rem",
                }}
              >
                {hero.title}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <p className="lead" style={{ color: "white" }}>
                {hero.lead}
              </p>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2rem" }}>
            <Col md={4}>
              <Button
                style={{ width: "100%" }}
                variant="primary"
                size="lg"
                onClick={() => navigate(hero.cta.link)}
              >
                {hero.cta.text}
              </Button>
            </Col>
          </Row>
        </Container>

        <PreviewCompatibleImage
          style={{
            objectFit: "cover",
            objectPosition: -20,
          }}
          imageInfo={{
            image: hero.images[0].image,
            alt: hero.images[0].title,
            style: {
              borderRadius: "0px",
              maxWidth: "none",
              height: "100%",
              width: "100%",
            },
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 0,
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 26.15%, rgba(0, 0, 0, 0.65) 66.15%, #000000 100%)",
          }}
        ></div>
      </div>

      {/* Desktop Hero */}
      <Container className="d-none d-lg-block">
        <Row
          className="align-items-md-center herorow"
          style={{ marginTop: "7rem" }}
        >
          <Col sm={12} md={7} lg={8} xl={8}>
            <Row
              className="justify-content-start align-items-center"
              style={{
                height: "67vh",
                position: "relative",
              }}
            >
              <CarouselWrapper
                images={hero.images}
                title={hero.title}
                lead={hero.lead}
                ctatext={hero.cta.text}
                ctalink={hero.cta.link}
              />

              <Link to={hero.images[0].link}></Link>
            </Row>
          </Col>

          <Col sm={12} md={5} lg={4} xl={3}>
            <h1>{hero.title}</h1>
            <p className="lead" style={{ fontWeight: 200 }}>
              {hero.lead}
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(hero.cta.link)}
            >
              {hero.cta.text}
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Rechtsbereiche */}
      <div style={{ background: "#172340", paddingTop: 40, paddingBottom: 40 }}>
        <Container fluid={"sm"}>
          <RechtRoll rechtsbereiche={rechtsgebiete.lead} />
        </Container>
      </div>

      {/* Kontakt */}
      <div style={{ position: "relative" }}>
        <a
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          target="_blank"
          href="https://www.google.com/maps/place/Rechtsanwalt+Tarik+Sharief/@52.50342,13.3411114,17z/data=!3m1!4b1!4m5!3m4!1s0x47a850547a59cbff:0x4097aa41c581420e!8m2!3d52.50342!4d13.3433001"
        >
          <PreviewCompatibleImage
            style={{
              objectFit: "cover",
            }}
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
        <Container style={{ minHeight: "65vh" }}>
          <Row>
            <Col md={6} lg={4}>
              <Card
                style={{
                  backgroundColor: "rgba(255,255,255,1)",
                  // backdropFilter: "blur(20px)",
                  // WebkitBackdropFilter: "blur(20px)",
                  borderRadius: 0,
                  border: 0,
                  marginTop: 80,
                }}
              >
                <Card.Body>
                  <h1>{settings.description}</h1>
                  <ReactMarkdown>{settings.contact.info}</ReactMarkdown>
                  <ReactMarkdown>{settings.contact.contact}</ReactMarkdown>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Kontakt Banner */}
      <Container fluid className="bg-scnd">
        <Container>
          <Row className="justify-content-center">
            <Col md="auto">
              <h2 style={{ textAlign: "right", width: "fit-content" }}>
                Jetzt Kontakt aufnehmen
              </h2>
            </Col>
            <Col md="auto">
              <Button onClick={() => navigate("/kontakt")}>
                Zum Kontaktformular
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Blog */}
      <Container style={{ marginTop: "3rem" }}>
        <h1>Aktuelles</h1>
        <BlogRoll all={false} />
      </Container>
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
  console.log(frontmatter.hero);
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
