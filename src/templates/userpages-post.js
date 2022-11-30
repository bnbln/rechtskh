import React from "react";
import PropTypes from "prop-types";

import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/Layout";
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const UserPagePostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
  image
}) => {
  const PostContent = contentComponent || Content;
  return (
    <>
      {helmet || ""}
      {/* <PreviewCompatibleImage
                  imageInfo={{
                    image: image,
                    alt: title,
                    style: { position: "absolute", left: 0, top:0, right:0, width: "100%", zIndex: "-100", filter: "blur(100px)", transform: "scale(0.5)", opacity: "0.6"}
                  }}
                /> */}
      <div style={{background: "#f0f3f9", padding: "2rem 0rem", marginTop: "73px",}}>
      <Container style={{
 
      }}>
        <Row className=" align-items-md-center justify-content-between herorow" style={{marginBottom: 0}}>
          <Col md={12} lg={5} xl={4}>
            <h1 style={{hyphens: "auto"}}>{title}</h1>
            <p>{description}</p>
          </Col>
          <Col md={12} lg={7} xl={7}>
            <Row className="d-flex justify-content-start align-items-center">
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "60vh",
                  }}
                >
                  <PreviewCompatibleImage
                  imageInfo={{
                    image: image,
                    alt: title,
                    style: { width: "100%", height: "100%"}
                  }}
                />
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      </div>
      <Container style={{ background: "white", paddingTop: "2rem"}}>
        <Row>
          <Col xs={12} md={8}>
            <PostContent content={content} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

UserPagePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  image: PropTypes.object,
  date: PropTypes.string
};

const UserPagePost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <UserPagePostTemplate
        data={data}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        image={post.frontmatter.featuredimage}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
    </Layout>
  );
};

UserPagePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default UserPagePost;

export const pageQuery = graphql`
  query UserPagePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        description
        featuredimage {
          publicURL
          extension
          childImageSharp {
            gatsbyImageData(
              width: 1920
              quality: 80
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`;