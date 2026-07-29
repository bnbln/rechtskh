import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import { Row, Col, Card } from "react-bootstrap";

import PreviewCompatibleImage from "./PreviewCompatibleImage";

class BlogRollTemplate extends React.Component {
  render() {
    const { props } = this.props;
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    var all = props.all ? props.all : false;
    const Heading = `h${props.headingLevel || 2}`;
    return (
      <Row>
        {posts &&
          posts.slice(0, all === false ? 5 : 99).map(({ node: post }) => (
            <Col
              key={"BlogRoll-" + post.id}
              md="auto"
              lg={post.frontmatter.featuredpost ? 8 : 4}
            >
              <Card
                key={post.id}
                className="blogCard"
                style={{ borderRadius: 0, border: "none", marginBottom: 40 }}
              >
                  <PreviewCompatibleImage
                    className="card-img-top"
                    imageInfo={{
                      style: {
                        height: post.frontmatter.featuredpost ? 450 : 300,
                        borderRadius: 0,
                      },
                      image: post.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                      sizes: post.frontmatter.featuredpost
                        ? "(max-width: 991px) 100vw, 66vw"
                        : "(max-width: 991px) 100vw, 33vw",
                    }}
                  />
                  <article
                    className={`blog-list-item tile is-child box notification ${post.frontmatter.featuredpost ? "is-featured" : ""
                      }`}
                  >
                    <header>
                      <p
                        style={{
                          //marginTop: 14, fontWeight: 400, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "4px"
                          fontWeight: 800,
                          margin: "1rem  0px 5px 0px",
                          textTransform: "uppercase",
                          fontSize: "1rem",
                          letterSpacing: "1px",
                          color: "#334c8b",
                        }}
                      >
                        {post.frontmatter.recht
                          ? post.frontmatter.recht
                          : "Information"}
                      </p>
                      <Heading className="post-meta blogCardTitle">
                        <Link
                          className="stretched-link"
                          to={post.fields.slug}
                        >
                          {post.frontmatter.title}
                        </Link>
                      </Heading>
                      <p>Vom {post.frontmatter.date}</p>
                    </header>
                    <p style={{ fontWeight: 200 }}>
                      {post.frontmatter.description}
                    </p>
                    <span className="articlebutton" aria-hidden="true">
                      Weiterlesen →
                    </span>
                  </article>
              </Card>
            </Col>
          ))}
      </Row>
    );
  }
}

BlogRoll.propTypes = {
  all: PropTypes.bool,
  headingLevel: PropTypes.oneOf([2, 3, 4]),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function BlogRoll(props) {
  return (
    <StaticQuery
      query={graphql`
        query BlogRollQuery {
          allMarkdownRemark(
            sort: { frontmatter: { date: DESC } }
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
                        quality: 60
                        layout: CONSTRAINED
                        formats: [AUTO, WEBP, AVIF]
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
        <BlogRollTemplate data={data} count={count} props={props} />
      )}
    />
  );
}
