import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { markdownRemark } = useStaticQuery(
    graphql`
    query SITE_METADATA_QUERY {
      markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
        frontmatter {
          settings {
            site
          description
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
  return markdownRemark.frontmatter.settings
}

export default useSiteMetadata
