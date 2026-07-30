import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { markdownRemark } = useStaticQuery(
    graphql`
    query SITE_METADATA_QUERY {
      markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
        frontmatter {
          hero {
            images {
              title
            }
          }
          settings {
            site
          description
          footertext
          seo
          image {
            childImageSharp {
              gatsbyImageData(width: 720, quality: 70, layout: CONSTRAINED)
            }
          }
          menu {
            name
            to
          }
          footermenu {
            name
            to
          }
          contact {
            info
            contact
            open
            image {
              publicURL
              childImageSharp {
                gatsbyImageData(width: 720, quality: 70, layout: CONSTRAINED)
              }
            }
            bu
          }
          }
    
    
        }
      }
    }
    `
  )
  const { settings, hero } = markdownRemark.frontmatter
  return {
    ...settings,
    lawyerName: hero?.images?.[0]?.title,
  }
}

export default useSiteMetadata
