import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Container } from "react-bootstrap";
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const DatenschutzPageTemplate = ({
  title,
  lead,
  icon,
  image,
  content,
  contentComponent
}) => {
const PageContent = contentComponent || Content
return (
  <>
    <section className="mymargins">
      <PageContent className="content" content={content} />
    </section>
  </>
)
}

DatenschutzPageTemplate.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
  icon: PropTypes.object,
  image: PropTypes.object,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
}

const DatenschutzPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout data={data.markdownRemark.frontmatter}>
      <Container>
        <DatenschutzPageTemplate
          title={frontmatter.title}
          lead={frontmatter.lead}
          icon={frontmatter.icon}
          image={frontmatter.image}
          content={data.markdownRemark.html}
          contentComponent={HTMLContent}
        />
      </Container>
    </Layout>
  )
}

DatenschutzPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default DatenschutzPage

export const pageQuery = graphql`
  query DatenschutzPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "datenschutz-page" } }) {
      frontmatter {
        title
        lead
      }
      html
    }
  }
`
