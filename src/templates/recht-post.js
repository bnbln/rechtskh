import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Container, Button, Row, Col, Image} from 'react-bootstrap';

import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

export const RechtPostTemplate = ({
  data,
  banner,
  article,
  description,
  helmet,
}) => {
  const heroImage = getImage(data.picture);
  console.log("data", data );
  console.log("img", heroImage );
  return (
    <>
      {helmet || ''}
      <Container>
        <Row className=" align-items-md-center herorow">
            <Col md={12} lg={8} xl={8}>
            <Row className='d-flex justify-content-start align-items-center'>
                <Col>
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
                        lineHeight: 1
                    }}>ABCDEFG</h1>
                    <div style={{
                        height: "70vh"
                        }}>
                        <GatsbyImage image={heroImage} style={{height: "100%"}}  /> 
                    </div>                                
                    </div>
                </Col>
            </Row>
            </Col>
        <Col md={12} lg={4} xl={3}>
          <h1>{data.title}</h1>
          <p>{data.lead}</p>
        </Col>
        </Row>
      </Container>
    </>
  )
}

RechtPostTemplate.propTypes = {
  data: PropTypes.object,
  banner: PropTypes.object,
  article: PropTypes.object,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const RechtPost = ({ data }) => {
  const { markdownRemark: post } = data
  console.log(data);
  return (
    <Layout>
      <RechtPostTemplate
        data={data.markdownRemark.frontmatter}
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
  )
}

RechtPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default RechtPost

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
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
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
`
