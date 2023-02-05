import React from "react";
import PropTypes from "prop-types";

import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Content, { HTMLContent } from "../components/Content";
import BlogRollFilter from "../components/BlogRollFilter";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  recht,
  tags,
  date,
  title,
  helmet,
  image,
  data
}) => {
  const PostContent = contentComponent || Content;
  var lowercaseRecht = recht;
  //console.log("data ",data.markdownRemark.id);
  return (
    <>
      {helmet || ""}
      <div className="pageTitle" style={{ marginTop: "73px" }}>
        <Container>
          <Row
            className=" align-items-md-center justify-content-between"
            style={{ marginBottom: 0 }}
          >
            <Col md={12} lg={5} xl={4}>
              <a href={"/recht/" + lowercaseRecht + "/"}>
                <h5>{recht}</h5>
              </a>
              <h1 style={{ hyphens: "auto" }}>{title}</h1>
              <p style={{color: "#7a8cb8", marginTop: "1rem"}}>Vom {date}</p>

              <p>{description}</p>
            </Col>

            <Col md={12} lg={7} xl={7}>
              <Row className="d-flex justify-content-start align-items-center">
                <div className="imageWrapper">
                  <div className="image">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: image,
                        alt: title,
                        style: { width: "100%", height: "100%" },
                      }}
                    />
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="pageContent">
        <Row>
          <Col xs={12} md={6}>
            <PostContent content={content} />
          </Col>         
        </Row>
      </Container>
      { !recht || !data ? null :
        <Container style={{ marginTop: "3rem" }}>
        <h1>Weiteres zu {recht}</h1>
        <BlogRollFilter recht={recht} exclude={data.markdownRemark.id} light={false} />
      </Container>
        }
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
  recht: PropTypes.object,
  date: PropTypes.string,
  data: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <BlogPostTemplate
        data={data}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Aktuelles">
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
        recht={post.frontmatter.recht}
        date={post.frontmatter.date}
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
        date(formatString: "DD.MM.YYYY")
        title
        description
        recht
        featuredimage {
          publicURL
          extension
          childImageSharp {
            gatsbyImageData(width: 720, quality: 70, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
