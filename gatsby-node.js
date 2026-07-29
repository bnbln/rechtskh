const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
// const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions


  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    });
  }
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // fmImagesToRelative(node) // convert image paths for gatsby images - DEPRECATED in v2

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage !== 'build-javascript') return

  const config = getConfig()
  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    {
      module: /gatsby-plugin-decap-cms[\\/]gatsby-browser\.js$/,
      message: /the request of a dependency is an expression/i,
    },
  ]

  actions.replaceWebpackConfig(config)
}
