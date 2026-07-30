import React from "react";
import PropTypes from "prop-types";

import { graphql } from "gatsby";
import { Container } from "react-bootstrap";

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { SplitHero } from "../components/PageElements";
import Seo from "../components/Seo";

// eslint-disable-next-line
export const UserPagePostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  image
}) => {
  const PostContent = contentComponent || Content;
  return (
    <>
      <SplitHero
        title={title}
        lead={description}
        eyebrow="Kanzlei"
        image={image}
        imageAlt={title}
      />
      <Container className="legalPage">
        <PostContent className="richContent" content={content} />
      </Container>
    </>
  );
};

UserPagePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.object,
  date: PropTypes.string
};

const UserPagePost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <UserPagePostTemplate
        data={data}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={post.frontmatter.featuredimage}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
    </Layout>
  );
};

UserPagePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default UserPagePost;

export const Head = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Seo
      title={frontmatter.title}
      description={frontmatter.description}
      pathname={location.pathname}
      image={frontmatter.featuredimage.publicURL}
      noindex={frontmatter.noindex}
    />
  );
};

export const pageQuery = graphql`
  query UserPagePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        description
        noindex
        featuredimage {
          publicURL
          extension
          childImageSharp {
            gatsbyImageData(width: 720, quality: 70, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
