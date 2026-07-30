import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";

import PreviewCompatibleImage from "./PreviewCompatibleImage";

const HOME_LIMIT = 3;

class BlogRollTemplate extends React.Component {
  render() {
    const { props, data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const all = Boolean(props.all);
    const Heading = `h${props.headingLevel || 2}`;
    const visible = all ? posts : posts.slice(0, HOME_LIMIT);

    const renderCard = ({ node: post }, variant = "standard", showText = false) => (
      <article
        className={`blogCard blogCard--${variant}`}
        key={`BlogRoll-${post.id}`}
      >
        <div className="blogCardMedia">
          {post.frontmatter.featuredimage ? (
            <PreviewCompatibleImage
              imageInfo={{
                image: post.frontmatter.featuredimage,
                alt: "",
                loading: "lazy",
                style: { aspectRatio: "4 / 2.6" },
                sizes:
                  variant === "lead"
                    ? "(max-width: 991px) 100vw, 66vw"
                    : "(max-width: 991px) 100vw, 33vw",
              }}
            />
          ) : (
            <div className="blogCardPlaceholder" aria-hidden="true">
              <span>Artikelbild</span>
            </div>
          )}
        </div>
        <div className="blogCardContent">
          <span className="blogCardKicker">
            {post.frontmatter.recht || "Information"}
          </span>
          <Heading className="blogCardTitle">
            <Link className="stretched-link" to={post.fields.slug}>
              {post.frontmatter.title}
            </Link>
          </Heading>
          <p className="blogCardMeta">Vom {post.frontmatter.date}</p>
          {showText && post.frontmatter.description ? (
            <p className="blogCardText">{post.frontmatter.description}</p>
          ) : null}
        </div>
      </article>
    );

    if (!all) {
      return (
        <div className="blogGrid blogGrid--home">
          {visible.map((post) => renderCard(post))}
        </div>
      );
    }

    const [lead, ...remaining] = visible;
    const stacked = remaining.slice(0, 2);
    const archive = remaining.slice(2);

    return (
      <>
        <div className="blogFeatureGrid">
          {lead ? renderCard(lead, "lead", true) : null}
          <div className="blogFeatureStack">
            {stacked.map((post) => renderCard(post, "compact"))}
          </div>
        </div>
        <div className="blogGrid blogGrid--archive">
          {archive.map((post) => renderCard(post, "standard", true))}
        </div>
      </>
    );
  }
}

BlogRollTemplate.propTypes = {
  props: PropTypes.object,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

BlogRoll.propTypes = {
  all: PropTypes.bool,
  headingLevel: PropTypes.oneOf([2, 3, 4]),
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
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  recht
                  description
                  date(formatString: "DD.MM.YYYY")
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 900
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
      render={(data) => <BlogRollTemplate data={data} props={props} />}
    />
  );
}
