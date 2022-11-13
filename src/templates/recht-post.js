import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql, navigate } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { Container, Row, Col, Button } from "react-bootstrap";
// import Content, { HTMLContent } from "../components/Content";

import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import BlogRollFilter from "../components/BlogRollFilter";

export const RechtPostTemplate = ({
  data,
  banner,
  article,
  image,
  picture,
  description,
  content,
  contentComponent,
  helmet,
}) => {
  // const PageContent = contentComponent || Content;
  const heroImage = getImage(picture);
  console.log("data", data);
  console.log("img", picture.publicURL);
  return (
    <>
      {helmet || ""}
      <Container>
        <Row className="d-flex align-items-md-center justify-content-between recht herorow ">
          <Col md={12} lg={5} xl={4}>
            <h1>{data.title}</h1>
            <p>{data.lead}</p>
            <div className="list">
              {data.article.map((item, i) => (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate("#" + i)}
                  key={"sectionbutton" + i}
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </Col>
          <Col md={12} lg={7} xl={7} className="order-sm-0">
            <Row className="d-flex justify-content-start align-items-center" >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{maxHeight: "70vh"}}
                >
                  {console.log("PICTURE", picture)}
                  <PreviewCompatibleImage
                  imageInfo={{
                    image: picture,
                    alt: "",
                    style: { borderRadius: "5px",  width: "100%", height: "100%"}
                  }}
                />
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <div
        style={{
          background: "#172340",
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        <Container>
        <BlogRollFilter recht={data.title}></BlogRollFilter>

          </Container>        
        </div>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            {article.map((item, i) => (
              <section className="recht content" key={"section" + i}>
                <h3 id={i}>{item.title}</h3>
                {/* <PageContent className="content" content={content} /> */}
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.body}</ReactMarkdown>
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
  banner: PropTypes.object,
  article: PropTypes.object,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const RechtPost = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(data);
  return (
    <Layout>
      <RechtPostTemplate
        data={data.markdownRemark.frontmatter}
        picture={data.markdownRemark.frontmatter.picture}
        banner={data.markdownRemark.frontmatter.banner}
        article={data.markdownRemark.frontmatter.article}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Recht">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
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

export const pageQuery = graphql`
  query RechtPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        lead
        image {
          publicURL
          extension
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        picture {
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 2400
              quality: 100
              layout: CONSTRAINED
            )
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
