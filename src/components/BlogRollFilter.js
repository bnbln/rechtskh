import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import { Col, Row } from "react-bootstrap";

import PreviewCompatibleImage from "./PreviewCompatibleImage";

const BlogRollFilterTemplate = ({ data, props }) => {
  const posts = data.allMarkdownRemark.edges
    .filter(
      ({ node }) =>
        node.id !== props.exclude && node.frontmatter.recht === props.recht
    )
    .slice(0, props.all ? 100 : 3);

  if (!posts.length) return null;

  return (
    <>
      <div className="sectionHead">
        <div>
          <h2 className="sectionEyebrow">Artikel zum {props.recht}</h2>
          <p className="sectionLead">Aktuelles aus der Kanzlei</p>
        </div>
        <Link className="linkUnderline" to="/blog/">
          Alle Artikel ansehen →
        </Link>
      </div>
      <Row>
        {posts.map(({ node: post }) => (
          <Col key={post.id} md={6} lg={4} className="blogCard">
            <article>
              <div className="blogCardMedia">
                {post.frontmatter.featuredimage ? (
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.featuredimage,
                      alt: "",
                      loading: "lazy",
                      sizes: "(max-width: 767px) 100vw, 33vw",
                      style: { aspectRatio: "4 / 2.6" },
                    }}
                  />
                ) : (
                  <div className="blogCardPlaceholder" aria-hidden="true">
                    <span>Artikelbild</span>
                  </div>
                )}
              </div>
              <span className="blogCardKicker">{post.frontmatter.recht}</span>
              <h3 className="blogCardTitle">
                <Link className="stretched-link" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
              </h3>
            </article>
          </Col>
        ))}
      </Row>
    </>
  );
};

BlogRollFilterTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({ edges: PropTypes.array }),
  }).isRequired,
  props: PropTypes.object.isRequired,
};

BlogRollFilter.propTypes = {
  all: PropTypes.bool,
  exclude: PropTypes.string,
  recht: PropTypes.string.isRequired,
};

export default function BlogRollFilter(props) {
  return (
    <StaticQuery
      query={graphql`
        query BlogRollFilterQuery {
          allMarkdownRemark(
            sort: { frontmatter: { date: DESC } }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  recht
                  title
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 720
                        quality: 68
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
      render={(data) => <BlogRollFilterTemplate data={data} props={props} />}
    />
  );
}
