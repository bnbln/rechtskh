import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { Row, Col, Card } from "react-bootstrap";
import Img from "gatsby-image"
import PreviewCompatibleImage from './PreviewCompatibleImage';

class RechtRollTemplate extends React.Component {
  render() {
    const { props } = this.props
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Row className="justify-content-center align-items-center rechtroll">
        <Col style={{color: "white"}} sm={12} lg={3}>
          <h2 style={{
            fontWeight: 300
          }}>{props.rechtsbereiche}</h2>
        </Col>
        {posts &&
          posts.map(({ node: post }) => (
            
            <Col key={"rechtroll-post-"+post.id} sm={12} lg={3} style={{
              justifyContent: "center",
              display: "flex",
              position: "relative",
              
        }}>
          <a href={post.fields.slug} style={{
            width: "100%",
            color: "inherit",
            textDecoration: "inherit"
          }}>
          <Card style={{ 
            width: "100%",
            position: "relative",
            display: "flex",
            minWidth: 0,
            wordWrap: "break-word",
            backgroundColor: "#fff",
            backgroundClip: "border-box",
            border: "0px solid rgba(0, 0, 0, 0.125)",
            borderRadius: "0rem",
            overflow: "hidden",
            boxShadow: "black 0px 0 70px -50px"  
            
            }}>
            
            <Card.Body>
              <Card.Title style={{
                margin: 0,
                textAlign: "center"
              }}>{post.frontmatter.title}</Card.Title>
              {/* <Button variant="secondary" size='sm' onClick={()=> navigate(post.fields.slug)}>Mehr erfahren</Button> */}
            </Card.Body>
            <PreviewCompatibleImage 
              imageInfo={{
                style: { border: "4px solid white" },
                image: post.frontmatter.picture,
                alt: post.frontmatter.title,
                className: "card-img-top"
              }} />
            {/* <img className="card-img-top" style={{border: "4px solid white"}} src={post.frontmatter.picture.publicURL} alt={post.frontmatter.title}/> */}
          </Card>
          </a>
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
                      gatsbyImageData(width: 300, quality: 50, layout: CONSTRAINED)
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
