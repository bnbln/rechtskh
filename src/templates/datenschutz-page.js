import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Container, Row, Col } from "react-bootstrap";
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
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
  <div style={{background: "#f0f3f9", padding: "2rem 0rem", marginBottom: "2rem",marginTop: "73px",}}>
      <Container>
        <Row>
          <Col>
            <h1 style={{margin: 0, marginTop: 5}}>{title}</h1>    
          </Col>
        </Row>
      </Container>
     </div>
     <Container>
     <Row>
        <Col md={6}>
          <PageContent className="content" content={content} />
        </Col>
      </Row>
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
          content={data.markdownRemark.html}
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
