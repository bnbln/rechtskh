import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Navbar, Container, Nav, NavDropdown, Button, Row, Col, Card, Image} from 'react-bootstrap';

import image01 from "../img/about/IMAGE.png";
import image02 from "../img/about/IMAGE2.png";
import image03 from "../img/about/ImageAbout_cutout.png";
import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import FullWidthImage from "../components/FullWidthImage";

function ContactPage() {
  return (
    <div style={{
      backgroundImage: "url("+image03+")",
      backgroundSize: "cover"
    }}>
      <Container style={{minHeight: "100vh"}}>
        <Row>
          <Col md={4}>
          <h2>Unsere Kanzlei am Wittenbergplatz</h2>
          <p>Lernen Sie uns, unsere Stärken und Kolleg*innen besser kennen</p>
          <Card>
            <Card.Body>
              <p>
                <b>Rechtsanwälte in Bürogemeinschaft</b><br/>
                Tarik Sharief, Zivilrecht <br/>
                Antonia Simeonova, Fachanwältin für Verkehrsrecht <br/>
                Tanja Ruperti, Fachanwältin für Arbeitsrecht
              </p>
              <p>
                <b>Anschrift</b><br/>
                Ansbacher Straße 13<br/>
                10787 Berlin
              </p>
              <p>
                <b>Kontaktdaten</b><br/>
                Telefon: +49/(0)30-69 53 33 61<br/>
                Fax: +49/(0)30-69 53 33 62<br/>
                Mail: kanzlei@rechtsklarheit.de<br/>
              </p>
              <p>
                <b>Sprechzeiten</b><br/>
                Mo-Fr 9:00-12:00 Uhr<br/>
                Mo, Di, Do 15:00-18:00 Uhr<br/>
              </p>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
function Banner() {
  return (
    <>
      <Container fluid className='bg-scnd'>
        <Container>
          <Row>
            <Col><h2 style={{ textAlign: "right"}}>Jetzt Kontakt aufnehmen</h2></Col>
            <Col><Button>Zum Kontaktformular</Button></Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

// eslint-disable-next-line
export const IndexPageTemplate = ({
  images,
  title,
  lead,
  ctatext,
  ctalink
}) => {
  const heroImage = getImage(images[0].image);
  const heroImage1 = getImage(images[1].image);
  return (
    <>
      <Container>
      <Row className="justify-content-between align-items-md-center herorow">
        <Col md={12} lg={4} xl={3}>
          <h1>{title}</h1>
          <p>{lead}</p>
          <Button variant="secondary" to={ctalink}>{ctatext}</Button>
        </Col>
        <Col md={12} lg={8} xl={9}>
          <Row className='d-flex justify-content-end'>
            <Col xs={10} md={10} lg={8}>
              <Link to={images[0].link}>
              <div style={{
                  position: "relative"
                }}>
                  <h1 style={{
                    position: "absolute",
                    left: 5,
                    bottom: 0,
                    zIndex: 10,
                    marginLeft: "2rem",
                    marginBottom: "2rem",
                    color: "white",
                    fontWeight: 700,
                    lineHeight: 1
                  }}>{images[0].title}</h1>
                  <GatsbyImage image={heroImage} alt={images[0].title} />                
                </div>
              </Link>
            </Col>
            <Col xs={2} md={2} lg={2} className='window02'>
              <Link to={images[1].link}>
              <div>
            <GatsbyImage image={heroImage1} alt={images[1].title} />  
              <p style={{
                lineHeight: 1,
                marginTop: "1rem"
              }}>{images[1].title}</p>
              </div>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
      <ContactPage />
      <Banner />
    </>
  );
};

IndexPageTemplate.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.object,
    link: PropTypes.string.isRequired
  })),
  title: PropTypes.string,
  lead: PropTypes.string,
  ctatext: PropTypes.string,
  ctalink: PropTypes.string
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
