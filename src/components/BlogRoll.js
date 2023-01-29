import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import { Row, Col, Card } from "react-bootstrap";

import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRollTemplate extends React.Component {
  render() {
    const {props} = this.props;
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    var all = props.all ? props.all : false
    // console.log(data);
    return (
      <Row>
        {posts &&
          posts.slice(0, all === false ? 5 : 99).map(({ node: post }) => (
            <Col key={"BlogRoll-"+post.id} md="auto" lg={post.frontmatter.featuredpost ? 8 : 4}>
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
                          style: { height: post.frontmatter.featuredpost ? 450: 300, borderRadius: 0},
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
                  <p style={{
                    //marginTop: 14, fontWeight: 400, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "4px"
                    fontWeight: 800,
                    margin: "1rem  0px 5px 0px",
                    textTransform: "uppercase",
                    fontSize: "1rem",
                    letterSpacing: "1px",
                    color: "#334c8b"
                    }}>
                      {post.frontmatter.recht ? post.frontmatter.recht : "Information"}
                    </p>
                  <h5 className="post-meta" style={{ fontWeight: 700}}>
                      {post.frontmatter.title}
                  </h5>
                  <p>Vom {post.frontmatter.date}</p>
                </header>
                <p style={{fontWeight: 300}}>
                  {post.excerpt}
                  <span> </span>
                  <Link className="articlebutton" to={post.fields.slug}>
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
                  recht
                  description
                  date(formatString: "DD.MM.YYYY")
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 720
                        quality: 100
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
