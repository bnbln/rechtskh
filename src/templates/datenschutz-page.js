import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Container } from "react-bootstrap";
import Layout from '../components/Layout'
import Content, { HTMLContent, remapHeadings } from '../components/Content'
import { SimplePageHeader } from '../components/PageElements'
import Seo from '../components/Seo'

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
    <SimplePageHeader title={title} eyebrow="Rechtliche Hinweise" lead={lead} />
    <Container className="legalPage">
      <PageContent
        className="richContent promotedLegalHeadings"
        content={content}
      />
    </Container>
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
     
        <DatenschutzPageTemplate
          title={frontmatter.title}
          lead={frontmatter.lead}
          icon={frontmatter.icon}
          image={frontmatter.image}
          content={remapHeadings(data.markdownRemark.html, { 4: 3 })}
          contentComponent={HTMLContent}
        />
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

export const Head = ({ location }) => (
  <Seo
    title="Datenschutzerklärung"
    description="Datenschutzhinweise der Rechtsanwaltskanzlei Tarik Sharief für die Nutzung von rechtsklarheit.de."
    pathname={location.pathname}
  />
)

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
