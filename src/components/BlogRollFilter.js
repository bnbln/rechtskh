import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import { Row, Card, Container, CardGroup } from "react-bootstrap";

import PreviewCompatibleImage from "./PreviewCompatibleImage";

class BlogRollFilterTemplate extends React.Component {
  render() {
    const { props } = this.props;
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    var all = props.all ? props.all : false;

    const category = [];
    posts.forEach((post) => {
      if (post.node.frontmatter.recht === props.recht) {
        category.push(post);
      }
    });
    return (
      <>
        <Row>
          <h2
            style={{
              color: "white",
              marginBottom: "1.8rem",
              fontSize: "1.8rem",
              fontWeight: "300",
            }}
          >
            Aktuelles zum {props.recht}
          </h2>
        </Row>
        <Row>
          <CardGroup style={{ gap: "2rem" }}>
            {posts &&
              category
                .slice(0, all === false ? 3 : 100)
                .map(({ node: post }) => (
                  <Card
                    key={post.id}
                    style={{
                      borderRadius: 0,
                      border: "none",
                      marginBottom: 40,
                      background: "##f0f3f9",
                    }}
                  >
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                      style={{
                        textDecoration: `none`,
                        color: `black`,
                      }}
                    >
                      <PreviewCompatibleImage
                        className="card-img-top"
                        imageInfo={{
                          style: { height: 300 },
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </Link>
                    <Container>
                      <article
                        className={`blog-list-item tile is-child box notification ${
                          post.frontmatter.featuredpost ? "is-featured" : ""
                        }`}
                      >
                        <header>
                          <h5 className="post-meta" style={{ marginTop: 14 }}>
                            {post.frontmatter.title}
                          </h5>
                        </header>
                        <p>
                          {post.frontmatter.description}
                          <span> </span>
                          <Link
                            className="button"
                            to={post.fields.slug}
                            style={{ color: "#258EA6" }}
                          >
                            Weiterlesen →
                          </Link>
                        </p>
                      </article>
                    </Container>
                  </Card>
                ))}
          </CardGroup>
        </Row>
      </>
    );
  }
}

BlogRollFilter.propTypes = {
  all: PropTypes.object,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function BlogRollFilter(props) {
  return (
    <StaticQuery
      query={graphql`
        query BlogRollFilterQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 200)
                id
                fields {
                  slug
                }
                frontmatter {
                  recht
                  title
                  description
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
      render={(data, count) => (
        <BlogRollFilterTemplate data={data} count={count} props={props} />
      )}
    />
  );
}
