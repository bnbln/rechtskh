import React, {useState, useEffect} from "react";
import PropTypes, { func } from "prop-types";
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
  const [heroState, setHeroState] = useState(0)
  const [hoverState, setHoverState] = useState(false)
  const heroImage = getImage(images[0].image);
  const heroImage1 = getImage(images[1].image);
  console.log(hoverState);

  useEffect(() => {
    if(hoverState == false) {
    const intervalId = setInterval(() => {
      console.log("loop");
      
        if (heroState === 0) {
          setHeroState(1)
        } else {
          setHeroState(0)
        }
    }, 6000);
    return () => clearInterval(intervalId);
  }
  }, [hoverState, heroState]);
  

  function setToggle(input) {
    console.log("Stop Loop");
    setHeroState(input);
    setHoverState(true)
    
    
  }
  var timingfunction = "3s cubic-bezier(0.45, 0, 0.55, 1)"
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
          <Row className='d-flex justify-content-end align-items-center'>

            <Col xs={heroState === 0 ? 10 : 2} md={heroState === 0 ? 10 : 2} lg={heroState === 0 ? 8 : 2} style={{height: "60vh", transition: timingfunction}} onMouseOut={()=>setHoverState(false)} onMouseOver={()=>setToggle(0)} >
              <Link to={images[0].link}>
              <div style={{
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <h1 style={{
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
                    transform: heroState === 0 ? "translateX(0px)" : "translateX(-370px)"
                  }}>{images[0].title}</h1>
                  <div style={{
                    height: heroState === 0 ? "70vh" : "60vh",
                    transition: timingfunction,
                    position: "relative",
                    marginTop: heroState === 0 ? "0vh" : "5vh"
                    }}>
                      <GatsbyImage image={heroImage || images[0].path} alt={images[0].title} style={{height: "100%"}}  /> 
                  </div>
                                 
                </div>
              </Link>
            </Col>
            
            <Col xs={heroState === 0 ? 2 : 10} md={heroState === 0 ? 2 : 10} lg={heroState === 0 ? 2 : 8} className='window02' style={{height: "60vh", transition: timingfunction}} onMouseOut={()=>setHoverState(false)} onMouseOver={()=>setToggle(1)} >
              <Link to={images[1].link}>
              <div style={{
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <h1 style={{
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
                    transform: heroState === 1 ? "translateX(0px)" : "translateX(-370px)"
                  }}>{images[1].title}</h1>
                  <div style={{
                    height: heroState === 1 ? "70vh" : "60vh",
                    transition: timingfunction,
                    position: "relative",
                    marginTop: heroState === 1 ? "0vh" : "5vh"
                    }}>
                   <GatsbyImage image={heroImage1 || images[1].path} alt={images[1].title} style={{height:"100%"}} /> 
                  </div>               
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
