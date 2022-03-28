import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Helmet } from "react-helmet";
import { graphql, Link, navigate } from "gatsby";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";

import Layout from "../components/Layout";
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  image
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      {helmet || ""}
      <Container>
        <Row className=" align-items-md-center justify-content-between herorow">
          <Col md={12} lg={5} xl={4}>
            <h1>{title}</h1>
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
                    height: "70vh",
                  }}
                >
                  {/* <img src={picture.publicURL} style={{ width: "100%" }} /> */}
                  <PreviewCompatibleImage
                  imageInfo={{
                    image: image,
                    alt: title,
                    style: { borderRadius: "5px",  width: "100%", height: "100%"}
                  }}
                />
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <PostContent content={content} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  image: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
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
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        featuredimage {
          childImageSharp {
            gatsbyImageData(
              width: 2400
              quality: 100
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`;
