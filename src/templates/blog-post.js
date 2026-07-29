import React from "react";
import PropTypes from "prop-types";

import { graphql, Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Content, { HTMLContent, remapHeadings } from "../components/Content";
import BlogRollFilter from "../components/BlogRollFilter";
import Seo from "../components/Seo";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  recht,
  tags,
  date,
  title,
  image,
  data
}) => {
  const PostContent = contentComponent || Content;
  const lowercaseRecht = recht?.toLocaleLowerCase("de-DE");
  return (
    <>
      <div className="pageTitle" style={{ marginTop: "73px" }}>
        <Container>
          <Row
            className=" align-items-md-center justify-content-between"
            style={{ marginBottom: 0 }}
          >
            <Col md={12} lg={5} xl={4}>
              {recht && (
                <Link className="practiceLabel" to={`/recht/${lowercaseRecht}/`}>
                  {recht}
                </Link>
              )}
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
                        loading: "eager",
                        fetchPriority: "high",
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
            <PostContent className="content promotedHeadings" content={content} />
          </Col>         
        </Row>
      </Container>
      { !recht || !data ? null :
        <Container style={{ marginTop: "3rem" }}>
        <h2 className="sectionHeading">Weiteres zu {recht}</h2>
        <BlogRollFilter recht={recht} exclude={data.markdownRemark.id} />
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
        content={remapHeadings(post.html, { 3: 2 })}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
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

export const Head = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Seo
      title={frontmatter.title}
      description={frontmatter.description}
      pathname={location.pathname}
      image={frontmatter.featuredimage.publicURL}
      type="article"
      datePublished={frontmatter.datePublished}
    />
  );
};

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        datePublished: date
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
