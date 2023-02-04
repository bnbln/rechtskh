import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";

import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

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
      <div className="pageTitle">
        <Container>
          <Row>
            <Col>
              <h1>{title}</h1>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="aboutHero">
        <Container>
          <Row gap={24} className="align-items-md-center justify-content-center">
            <Col xs={8} sm={6} lg={3} style={{ padding: "1.5rem"}}>
              <PreviewCompatibleImage
              className="about-image "
                imageInfo={{
                  image: image,
                  alt: title,
                  style: { width: "100%", height: "auto", objectFit: "contain",  },
                }}
              />
            </Col>
            <Col
            className="list"
              xs={12}
              sm={12}
              lg={6}
            >
              <Row>
                <Col>
                <h3>{subtitle}</h3>
                <h5 style={{ fontWeight: "200", lineHeight: "150%", marginBottom: 16 }}>
                {lead} <Link to={"/blog/2023-01-29-focus-spezial-oktober-2014-deutschlands-top-anwälte-krieg-um-die-wohnung/"}>Weiterlesen →</Link>
              </h5>
                </Col>
             
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Container style={{ background: "white", paddingTop: "2rem" }}>
        <Row>
          <Col xs={12} md={7}>
            <PageContent className="content" content={content} />
          </Col>
        </Row>
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
        lead
        featuredimage {
          childImageSharp {
            gatsbyImageData(width: 720, quality: 70, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
