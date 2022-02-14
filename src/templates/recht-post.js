import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

export const RechtPostTemplate = ({
  data,
  banner,
  article,
  helmet,
}) => {
  console.log("data", data );
  return (
    <>
      
    </>
  )
}

RechtPostTemplate.propTypes = {
  data: PropTypes.object,
  banner: PropTypes.object,
  article: PropTypes.object,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const RechtPost = ({ data }) => {
  const { markdownRemark: post } = data
  console.log(data);
  return (
    <Layout data={{
      icon: post.frontmatter.image,
      title: post.frontmatter.title,
      lead: post.frontmatter.lead,
      image: post.frontmatter.picture,
      list: post.frontmatter.article
    }} variant="light">
      <RechtPostTemplate
        data={data.markdownRemark.frontmatter}
        banner={data.markdownRemark.frontmatter.banner}
        article={data.markdownRemark.frontmatter.article}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Recht">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

RechtPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default RechtPost

export const pageQuery = graphql`
  query RechtPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
