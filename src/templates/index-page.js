import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, navigate, graphql } from "gatsby";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Container, Button, Row, Col, Card, Carousel } from "react-bootstrap";
import ReactMarkdown from 'react-markdown'


import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import BlogRoll from "../components/BlogRoll";
import RechtRoll from "../components/RechtRoll";

import image03 from "../img/about/ImageAbout_cutout.png";
import Layout from "../components/Layout";

import metadata from "../../content/settings/global.yml";

export const IndexPageTemplate = ({
  images,
  title,
  lead,
  ctatext,
  ctalink,
  rechtsbereiche
}) => {
  const [heroState, setHeroState] = useState(0);
  const [hoverState, setHoverState] = useState(false);
  // const heroImage = getImage(images[0].image);
  // const heroImage1 = getImage(images[1].image);
  useEffect(() => {
    if (hoverState === false) {
      const intervalId = setInterval(() => {
        if (heroState === 0) {
          setHeroState(1);
        } else {
          setHeroState(0);
        }
      }, 6500);
      return () => clearInterval(intervalId);
    }
  }, [hoverState, heroState]);

  function setToggle(input) {
    setHeroState(input);
    setHoverState(true);
  }
  var timingfunction = "3s cubic-bezier(0.45, 0, 0.55, 1)";
  return (
    <>
      <Container>
        <Row className="align-items-md-center herorow">
          <Col sm={12} md={7} lg={8} xl={8}>
            <Carousel className="d-flex d-md-none" style={{
              marginBottom: "1rem"
            }}>
              <Carousel.Item onClick={()=> navigate(images[0].link)}>
              <PreviewCompatibleImage
                style={{
                  height: "100%"
                }}
                  imageInfo={{
                    image: images[0].image,
                    alt: images[0].title,
                    style: { borderRadius: "5px", maxWidth: "none", height: "100%"}
                  }}
                />
                <Carousel.Caption>
                  <h1>{images[0].title}</h1>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item onClick={()=> navigate(images[1].link)}>
                <PreviewCompatibleImage
                  style={{
                    height: "100%"
                  }}
                    imageInfo={{
                      image: images[1].image,
                      alt: images[1].title,
                      style: { borderRadius: "5px", maxWidth: "none", height: "100%"}
                    }}
                  />
                <Carousel.Caption>
                  <h1>{images[1].title}</h1>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <Row className="d-flex justify-content-start align-items-center d-none d-md-flex">
              <Col
                sm={heroState === 0 ? 10 : 2}
                md={heroState === 0 ? 10 : 2}
                lg={heroState === 0 ? 8 : 3}
                style={{ height: "70vh", maxHeight: heroState === 1 ? "700px" : "800px", transition: timingfunction }}
                onMouseOut={() => setHoverState(false)}
                onMouseOver={() => setToggle(0)}
              >
                <Link to={images[0].link}>
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <h1 
                      style={{
                        position: "absolute",
                        maxWidth: 100,
                        left: 5,
                        bottom: 0,
                        zIndex: 10,
                        marginLeft: "2rem",
                        marginBottom: "2rem",
                        color: "white",
                        fontWeight: 700,
                        lineHeight: 1,
                        transition: timingfunction,
                        opacity: heroState === 0 ? 1 : 0,
                        transform:
                          heroState === 0
                            ? "translateX(0px)"
                            : "translateX(-370px)",
                      }}
                    >
                      {images[0].title}
                    </h1>
                    <div
                      style={{
                        height: heroState === 0 ? "70vh" : "60vh",
                        maxHeight: heroState === 1 ? "700px" : "800px",
                        transition: timingfunction,
                        position: "relative",
                        marginTop: heroState === 0 ? "0vh" : "5vh",
                      }}
                    >
                        <PreviewCompatibleImage
                        style={{
                          height: "100%"
                        }}
                          imageInfo={{
                            image: images[0].image,
                            alt: images[0].title,
                            style: { borderRadius: "5px", maxWidth: "none", height: "100%"}
                          }}
                        />
                    </div>
                  </div>
                </Link>
              </Col>
              <Col            
                sm={heroState === 0 ? 2 : 10}
                md={heroState === 0 ? 2 : 10}
                lg={heroState === 0 ? 3 : 8}
                className="window02"
                style={{ height: "70vh", maxHeight: heroState === 1 ? "700px" : "800px", transition: timingfunction }}
                onMouseOut={() => setHoverState(false)}
                onMouseOver={() => setToggle(1)}
              >
                <Link to={images[1].link}>
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <h1
                      style={{
                        position: "absolute",
                        maxWidth: 100,
                        left: 5,
                        bottom: 0,
                        zIndex: 10,
                        marginLeft: "2rem",
                        marginBottom: "2rem",
                        color: "white",
                        fontWeight: 700,
                        lineHeight: 1,
                        transition: timingfunction,
                        opacity: heroState === 1 ? 1 : 0,
                        transform:
                          heroState === 1
                            ? "translateX(0px)"
                            : "translateX(-370px)",
                      }}
                    >
                      {images[1].title}
                    </h1>
                    <div
                      style={{
                        height: heroState === 1 ? "70vh" : "60vh",
                        maxHeight: heroState === 1 ? "700px" : "800px",
                        transition: timingfunction,
                        position: "relative",
                        marginTop: heroState === 1 ? "0vh" : "5vh",
                      }}
                    >
                      <PreviewCompatibleImage
                        style={{
                          height: "100%"
                        }}
                          imageInfo={{
                            image: images[1].image,
                            alt: images[1].title,
                            style: { borderRadius: "5px", maxWidth: "none", height: "100%"}
                          }}
                        />
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
          </Col>

          <Col sm={12} md={5} lg={4} xl={3}>
            <h1>{title}</h1>
            <p className="lead">{lead}</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(ctalink)}
            >
              {ctatext}
            </Button>
          </Col>
        </Row>
      </Container>
      <div
        style={{
          background: "#172340",
          paddingTop: 40,
          paddingBottom: 40,
          marginBottom: 140,
        }}
      >
        <Container fluid={"sm"}>
          <RechtRoll rechtsbereiche={rechtsbereiche} />
        </Container>
      </div>
      <div
        style={{
          backgroundImage: "url(" + image03 + ")",
          backgroundSize: "cover",
        }}
      >
        <Container style={{ minHeight: "100vh" }}>
          <Row>
            <Col md={6} lg={4}>
              <h2>{metadata.description}</h2>
              <Card>
                <Card.Body>
                  <ReactMarkdown>{metadata.contact.info}</ReactMarkdown>
                  <ReactMarkdown>{metadata.contact.contact}</ReactMarkdown>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Container fluid className="bg-scnd">
        <Container>
          <Row className="justify-content-center">
            <Col md="auto">
              <h2 style={{ textAlign: "right", width: "fit-content" }}>Jetzt Kontakt aufnehmen</h2>
            </Col>
            <Col md="auto">
              <Button onClick={()=> navigate("/contact")}>Zum Kontaktformular</Button>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container style={{padding: "4rem 0px"}}>
        <h1>Aktuelles</h1>
        <BlogRoll all={false} />
      </Container>
    </>
  );
};

IndexPageTemplate.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.object,
      link: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
  lead: PropTypes.string,
  ctatext: PropTypes.string,
  ctalink: PropTypes.string,
  rechtsbereiche: PropTypes.string
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        lead={frontmatter.lead}
        ctatext={frontmatter.ctatext}
        ctalink={frontmatter.ctalink}
        rechtsbereiche={frontmatter.rechtsbereiche}
        images={frontmatter.images}
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
        title
        lead
        ctatext
        ctalink
        rechtsbereiche
        images {
          title
          image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          link
        }
      }
    }
  }
`;
