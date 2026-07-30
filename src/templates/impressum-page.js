import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Container } from "react-bootstrap";
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { SimplePageHeader } from '../components/PageElements'
import Seo from '../components/Seo'


export const ImpressumPageTemplate = ({
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
      <PageContent className="richContent" content={content} />
    </Container>
  </>
)
}

ImpressumPageTemplate.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
  icon: PropTypes.object,
  image: PropTypes.object,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
}

const ImpressumPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout data={data.markdownRemark.frontmatter}>
        <ImpressumPageTemplate
          title={frontmatter.title}
          lead={frontmatter.lead}
          icon={frontmatter.icon}
          image={frontmatter.image}
          content={data.markdownRemark.html}
          contentComponent={HTMLContent}
        />
    </Layout>
  )
}

ImpressumPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ImpressumPage

export const Head = ({ location }) => (
  <Seo
    title="Impressum"
    description="Impressum und Anbieterkennzeichnung der Rechtsanwaltskanzlei Tarik Sharief in Berlin."
    pathname={location.pathname}
  />
)

export const pageQuery = graphql`
  query ImpressumPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "impressum-page" } }) {
      frontmatter {
        title
        lead
      }
      html
    }
  }
`
