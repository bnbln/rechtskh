import React from "react";
import PropTypes from "prop-types";
import { Link, navigate, graphql } from "gatsby";
import { Container, Button, Row, Col, Card, Stack } from "react-bootstrap";
import ReactMarkdown from 'react-markdown'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { CarouselWrapper } from "../components/CarouselWrapper";
import { CarouselMobileWrapper } from "../components/CarouselMobileWrapper";
import BlogRoll from "../components/BlogRoll";
import RechtRoll from "../components/RechtRoll";

import image03 from "../img/about/Map.jpg";
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
  return (
    <>


      <div className="d-block d-sm-none"
              style={{
                height: "650px",
                width: "100%",
                position: "relative",
              }}
            >
              <Container className="d-flex justify-content-end" style={{
                position: "absolute",
                left: 0,
                right:0,
                top:0,
                bottom: 0,
                zIndex:1,
                background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 26.15%, rgba(0, 0, 0, 0.65) 66.15%, #000000 100%)",
                padding:" var(--bs-gutter-x, 0.75rem)",
                flexDirection: "column"
              }}>
                <Row>
                  <Col>
                  <h1 style={{
                        color: "white", fontWeight: "900", fontSize: "1.2rem", marginBottom: "0.5rem"
                    }}>{images[0].title}
                  </h1>
                  </Col>
                
                </Row>
                <Row>
                  <Col>
                <h1 style={{color: "white", fontFamily: "Lato", fontSize: "1.5rem"}}>{title}</h1>
                </Col>
                </Row>
                <Row className="d-flex justify-content-end">
                  <Col >
                    <p className="lead" style={{color: "white"}}>{lead}</p>
                  </Col>
                </Row>
                <Row className="d-flex justify-content-end">
                  <Col >
                  <Button
                  style={{width: "100%"}}
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(ctalink)}
                >
                  {ctatext}
                </Button>
                  </Col>
                </Row>

                  
                

                
              
              </Container>
                

              <PreviewCompatibleImage
                style={{
                  objectFit: "cover",
                  objectPosition: -20
                }}
                imageInfo={{
                  image: images[0].image,
                  alt: images[0].title,
                  style: {
                    borderRadius: "0px",
                    maxWidth: "none",
                    height: "100%",
                  },
                }}
              />
      </div>


      <Container className="d-none d-lg-flex">
        <Row className="align-items-md-center herorow" style={{marginTop: "5rem"}}>
          <Col sm={12} md={7} lg={8} xl={8} >
            {/* <CarouselMobileWrapper images={images} /> */}
            <Row className="d-flex justify-content-start align-items-center d-none d-lg-flex" style={{
              height: "67vh",
              position: "relative"
            }}>
                        <CarouselWrapper images={images} title={title} lead={lead} ctatext={ctatext} ctalink={ctalink} />

            <Link to={images[0].link}>
            </Link>

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
          paddingBottom: 40
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
          backgroundPosition: "center",
          paddingTop: 80
        }}
      >
        <Container style={{ minHeight: "65vh" }}>
          <Row>
            <Col md={6} lg={4}>
              <Card style={{backgroundColor: "rgba(255,255,255,0.5)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" , borderRadius: 0, border: 0}}>
                <Card.Body>
                  <h1>{metadata.description}</h1>
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
              <Button onClick={()=> navigate("/kontakt")}>Zum Kontaktformular</Button>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container style={{marginTop: "3rem"}}>
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
              gatsbyImageData(
                width: 1920
                quality: 80
                layout: CONSTRAINED
                )
            }
          }
          link
        }
      }
    }
  }
`;
