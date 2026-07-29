import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
// import Content, { HTMLContent } from "../components/Content";

import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import BlogRollFilter from "../components/BlogRollFilter";
import Seo from "../components/Seo";

export const RechtPostTemplate = ({
  data,
  banner,
  article,
  picture,
  description,
  content,
  contentComponent,
}) => {
  return (
    <>
      <div
        //className="d-block d-lg-none"
        style={{
          height: "720px",
          width: "100%",
          position: "relative",
        }}
      >
        <Container
          className="d-flex justify-content-end"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1,
            padding: " var(--bs-gutter-x, 0.75rem)",
            flexDirection: "column",
          }}
        >
          <Row>
            <Col md={5}>
              <h1
                style={{
                  color: "white",
                  fontFamily: "Lato",
                  fontSize: "1.5rem",
                }}
              >
                {data.title}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <p className="lead" style={{ color: "white" }}>
                {data.lead}
              </p>
            </Col>
          </Row>
          <Row style={{marginBottom: "2rem"}}>
            <Col md={4}>
            <div className="list">
                {data.article.map((item, i) => (
                  <a
                    href={`#section-${i}`}
                    className="btn btn-primary"
                    key={"sectionbutton" + i}
                    style={{
                      background: "white",
                      color: "black",
                      border: 0
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </Col>
          </Row>
        </Container>

        <PreviewCompatibleImage
          style={{
            objectFit: "cover",
          }}
          imageInfo={{
            image: picture,
            alt: data.title,
            loading: "eager",
            fetchPriority: "high",
            style: {
              borderRadius: "0px",
              maxWidth: "none",
              height: "100%",
              width: "100%"
            },
          }}
        />
        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 0,
          background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 26.15%, rgba(0, 0, 0, 0.65) 66.15%, #000000 100%)",
            }}></div>
      </div>
      <div className="banner">
        <Container>
          <BlogRollFilter
            recht={data.title}
            headingOnDark
          ></BlogRollFilter>
        </Container>        
      </div>
      <Container>
        <Row>
          <Col xs={12} md={7}>
            {article.map((item, i) => (
              <section className="recht content" key={"section" + i}>
                <h2 id={`section-${i}`}>{item.title}</h2>
                {/* <PageContent className="content" content={content} /> */}
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{ h4: "h3" }}
                >
                  {item.body}
                </ReactMarkdown>
              </section>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

RechtPostTemplate.propTypes = {
  data: PropTypes.object,
  picture: PropTypes.object,
  banner: PropTypes.array,
  article: PropTypes.object,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
};

const RechtPost = ({ data }) => {
  const { markdownRemark: post } = data;
  //console.log(data);
  return (
    <Layout>
      <RechtPostTemplate
        data={data.markdownRemark.frontmatter}
        picture={data.markdownRemark.frontmatter.picture}
        banner={data.markdownRemark.frontmatter.banner}
        article={data.markdownRemark.frontmatter.article}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.lead}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

RechtPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default RechtPost;

export const Head = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Seo
      title={`${frontmatter.title} in Berlin`}
      description={frontmatter.lead}
      pathname={location.pathname}
      image={frontmatter.picture.publicURL}
    />
  );
};

export const pageQuery = graphql`
  query RechtPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        lead
        picture {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 1920, quality: 100, layout: CONSTRAINED)
          }
        }
        banner {
          title
          text
        }
        article {
          title
          body
        }
      }
    }
  }
`;
