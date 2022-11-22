import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const AboutPageTemplate = ({ title, subtitle, list, image, content, contentComponent }) => {
  const PageContent = contentComponent || Content;
// console.log(subtitle, list, image);
  return (
    <>
    
    <div style={{background: "#f0f3f9", padding: "2rem 0rem", marginTop: "73px"}}>
      <Container>
        <Row>
          <Col>
            <h1 style={{margin: 0, marginTop: 5}}>{title}</h1>    
          </Col>
        </Row>
      </Container>
    </div>
    <div style={{background: "#182340", color: "white"}}>
      <Container>
        <Row gap={24}>
        <Col sm={3} lg={3} style={{padding: "1.5rem", display: "flex"}} className="about-image ">
            <PreviewCompatibleImage
                    imageInfo={{
                      image: image,
                      alt: title,
                      style: { width: "100%", height: "auto", }
                    }}
                  />
          </Col>
          <Col sm={7} lg={9} style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "2rem"
          }}>
            <h3>{subtitle}</h3>
            <ul>
              {list.map((item)=> (<li>{item.item}</li>)
              )}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
    <section className="section section--gradient" style={{marginTop: "2rem"}}>
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
    
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  subtitle: PropTypes.string, 
  list: PropTypes.object,
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
        list={post.frontmatter.list}
        content={post.html}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        list {
          item
        }
        featuredimage {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
