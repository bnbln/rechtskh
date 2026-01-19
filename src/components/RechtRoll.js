import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class RechtRollTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    // Simple line SVG icons for each practice area
    const icons = {
      'Mietrecht': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
        </svg>
      ),
      'Versicherungsrecht': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      'Verkehrsrecht': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      ),
    };

    // Default scale/law icon
    const defaultIcon = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M3 12l3-3 3 3M15 9l3-3 3 3M6 15h3M15 15h3" />
      </svg>
    );

    return (
      <div className="practice-cards">
        {posts &&
          posts.map(({ node: post }) => (
            <a
              key={"rechtroll-post-" + post.id}
              href={post.fields.slug}
              className="practice-card"
            >
              <div className="practice-card-header">
                <h3>{post.frontmatter.title}</h3>
              </div>
              <div className="practice-card-image">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: post.frontmatter.picture,
                    alt: post.frontmatter.title,
                  }}
                />
                <div className="practice-card-icon">
                  {icons[post.frontmatter.title] || defaultIcon}
                </div>
              </div>
            </a>
          ))}
      </div>
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
            sort: { frontmatter: { date: DESC } }
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
