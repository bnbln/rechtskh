import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <>
    
    <div style={{background: "#f0f3f9", padding: "2rem 0rem"}}>
      <Container>
        <Row>
          <Col>
            <h1 style={{margin: 0, marginTop: 5}}>{title}</h1>    
          </Col>
        </Row>
      </Container>
    </div>
    <div style={{background: "#182340", padding: "2rem 0rem", color: "white"}}>
      <Container>
        <Row>
          <Container>
            <h3>Lebenslauf in Kürze</h3>
            <ul>
              <li>Tarik Sharief wurde 1965 in Dresden geboren</li>
              <li>1986 Studium Jura und Politikwissenschaften an der FU-Berlin</li>
              <li>Tarik Sharief wurde 1965 in Dresden geboren</li>
              <li>1986 Studium Jura und Politikwissenschaften an der FU-Berlin</li>
            </ul>
          </Container>
        </Row>
      </Container>
    </div>
    <section className="section section--gradient">
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
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
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
      }
    }
  }
`;
