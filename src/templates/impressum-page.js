import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Container, Button, Row, Col, Card, Carousel, Form } from "react-bootstrap";
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'


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
    <section className="mymargins">
      <PageContent className="content" content={content} />
    </section>
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
      <Container>
        <ImpressumPageTemplate
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

ImpressumPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ImpressumPage

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
