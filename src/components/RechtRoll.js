import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery, Link } from "gatsby";

import PreviewCompatibleImage from "./PreviewCompatibleImage";
import { LayersIcon, practiceIcon } from "./Icons";

// Staggered tile grid from the redesign: a tall tile, a wide tile, a filler
// card that carries the "aus einer Hand" message, and a third tile. The tile
// shapes are assigned by position in all.scss (.practiceTile:nth-child), so
// the CMS order of `rechtsgebiete.category` decides which area gets which
// shape.
const FILLER_TEXT = "Rechtsgebietsübergreifende Lösungen aus einer Hand";

const sortByCategory = (posts, order) => {
  if (!order?.length) return posts;

  const rank = new Map(
    order.map((title, index) => [title.trim().toLowerCase(), index])
  );
  const position = ({ node }) =>
    rank.has(node.frontmatter.title.trim().toLowerCase())
      ? rank.get(node.frontmatter.title.trim().toLowerCase())
      : order.length;

  return [...posts].sort((a, b) => position(a) - position(b));
};

const PracticeTiles = ({ data, order }) => {
  const posts = sortByCategory(data.allMarkdownRemark.edges, order).slice(0, 3);

  const tiles = posts.map(({ node: post }, index) => {
    const Icon = practiceIcon(post.frontmatter.title);

    return (
      <Link
        key={`rechtroll-post-${post.id}`}
        to={post.fields.slug}
        className="practiceTile"
      >
        <PreviewCompatibleImage
          imageInfo={{
            image: post.frontmatter.picture,
            alt: "",
            loading: "lazy",
            sizes:
              index === 0
                ? "(max-width: 991px) 100vw, 33vw"
                : "(max-width: 991px) 100vw, 66vw",
          }}
        />
        <span className="practiceTileScrim" aria-hidden="true" />
        <span className="practiceTileIcon">
          <Icon size={26} />
        </span>
        <span className="practiceTileBody">
          <span className="practiceTileTitle">{post.frontmatter.title}</span>
          <span className="practiceTileText">
            {post.frontmatter.teaser || post.frontmatter.lead}
          </span>
        </span>
      </Link>
    );
  });

  // The filler card sits in the bottom-left cell, between tile 2 and tile 3.
  return (
    <div className="practiceGrid">
      {tiles.slice(0, 2)}
      <div className="practiceFiller">
        <LayersIcon size={28} style={{ color: "var(--rk-teal)" }} />
        <span>{FILLER_TEXT}</span>
      </div>
      {tiles.slice(2)}
    </div>
  );
};

PracticeTiles.propTypes = {
  order: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function RechtRoll({ order }) {
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
                  lead
                  teaser
                  templateKey
                  picture {
                    publicURL
                    childImageSharp {
                      gatsbyImageData(
                        width: 900
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
      render={(data) => <PracticeTiles data={data} order={order} />}
    />
  );
}

RechtRoll.propTypes = {
  order: PropTypes.arrayOf(PropTypes.string),
};
