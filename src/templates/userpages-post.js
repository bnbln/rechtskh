import React from "react";
import PropTypes from "prop-types";

import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/Layout";
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const UserPagePostTemplate = ({
  content,
  contentComponent,
  date,
  title,
  helmet
}) => {
  return (
    <>
      {helmet || ""}
      <div style={{background: "#f0f3f9", padding: "2rem 0rem", marginTop: "73px",}} />
    </>
  );
};

UserPagePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
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
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
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

export const pageQuery = graphql`
  query UserPagePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
      }
    }
  }
`;