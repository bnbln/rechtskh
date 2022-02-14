import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, navigate } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
// import Content, { HTMLContent } from "../components/Content";

import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

export const RechtPostTemplate = ({
  data,
  banner,
  article,
  image,
  description,
  content,
  contentComponent,
  helmet,
}) => {
// const PageContent = contentComponent || Content;
  const heroImage = getImage(image);
  console.log("data", data );
  console.log("img", image );
  return (
    <>
      {helmet || ''}
      <Container>
        <Row className=" align-items-md-center justify-content-between herorow">
            <Col md={12} lg={5} xl={4}>

                            <h1>{data.title}</h1>
                            <p>{data.lead}</p>
                            <div className="list">
                                {data.article.map((item, i) => (
                                    <Button size="sm" variant="primary" onClick={()=> navigate("#"+i)} key={"sectionbutton"+i}>{item.title}</Button>
                                ))}
                            </div>
          
            </Col>
            <Col md={12} lg={7} xl={7}>
            <Row className='d-flex justify-content-start align-items-center'>
  
                <div style={{
                    position: "relative",
                    overflow: "hidden"
                    }}>
                    <div style={{
                        height: "70vh"
                        }}>
                            <img src={image.publicURL} />
                        <GatsbyImage image={heroImage} style={{height: "100%"}}  /> 
                    </div>                                
                    </div>
            </Row>
            </Col>
        </Row>
      </Container>
      <div style={{
                background: "#172340",
                paddingTop: 40,
                paddingBottom: 40
                }}></div>
      <Container>
        <Row>
            <Col xs={12} md={8}>
                {article.map((item,i)=> (
                <section className="recht content" key={"section"+i}>
                <h3 id={i}>{item.title}</h3>
                {/* <PageContent className="content" content={content} /> */}
                <ReactMarkdown>{item.body}</ReactMarkdown>
                </section>
            ))}
            </Col>
        </Row>
      </Container>
    </>
  )
}

RechtPostTemplate.propTypes = {
  data: PropTypes.object,
  image: PropTypes.object,
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
        image={data.markdownRemark.frontmatter.image}
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
