import React from 'react'
import PropTypes from 'prop-types'
import { Link, navigate, graphql, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Container, Button, Row, Col, Card, Carousel } from "react-bootstrap";

import PreviewCompatibleImage from './PreviewCompatibleImage'

class RechtRollTemplate extends React.Component {
  render() {
    const { props } = this.props
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Row className="justify-content-center align-items-center rechtroll">
        <Col style={{color: "white"}} sm={12} lg={3}>
          <h2>{props.rechtsbereiche}</h2>
        </Col>
        {posts &&
          posts.map(({ node: post }) => (
            <Col sm={12} lg={3} style={{
              justifyContent: "center",
              display: "flex",
              position: "relative"
        }}>
          <Card style={{ width: "100%" }}>
            <img className="card-img-top" src={post.frontmatter.picture.publicURL} alt={post.frontmatter.title}/>
            <Card.Body>
              <Card.Title>{post.frontmatter.title}</Card.Title>
              <Button variant="secondary" onClick={()=> navigate(post.fields.slug)}>Mehr erfahren</Button>
            </Card.Body>
          </Card>
        </Col>
            
          ))}
      </Row>
    )
  }
}

RechtRoll.propTypes = {
  props: PropTypes.array,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function RechtRoll(props) {
  return (
    <StaticQuery
      query={graphql`
        query RechtRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "recht-post" } } }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  picture {
                    publicURL
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )

                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <RechtRollTemplate data={data} count={count} props={props} />}
    />
  );
}
