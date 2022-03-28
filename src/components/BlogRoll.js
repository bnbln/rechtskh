import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Container, Button, Row, Col, Card, Carousel } from "react-bootstrap";

import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRollTemplate extends React.Component {
  render() {
    const {props} = this.props;
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    var all = props.all ? props.all : false
    console.log("P", props)
    return (
      <Row>
        {posts &&
          posts.slice(0, all === false ? 5 : 100).map(({ node: post }) => (
            <Col md="auto" lg={post.frontmatter.featuredpost ? 8 : 4}>
               <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                      style={{
                        textDecoration: `none`,
                        color: `black`,
                      }}
                    >
            <Card key={post.id} style={{borderRadius: 0, border: "none",  marginBottom: 40}}>
                  <PreviewCompatibleImage
                        className="card-img-top"
                        imageInfo={{
                          style: { height: post.frontmatter.featuredpost ? 450: 300, borderRadius: 5},
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`
                        }}
                      />
              <article
                className={`blog-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  <h5 className="post-meta" style={{marginTop: 14}}>
                      {post.frontmatter.title}
                  </h5>
                </header>
                <p>
                  {post.excerpt}
                  <span> </span>
                  <Link className="button" to={post.fields.slug} style={{color: "#258EA6"}}>
                    Weiterlesen →
                  </Link>
                </p>
              </article>
            </Card>
            </Link>
            </Col>
          ))}
      </Row>
    )
  }
}

BlogRoll.propTypes = {
  all: PropTypes.object,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function BlogRoll(props) {
  return (
    <StaticQuery
      query={graphql`
        query BlogRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: FULL_WIDTH
                      )
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <BlogRollTemplate data={data} count={count} props={props}/>}
    />
  );
}
