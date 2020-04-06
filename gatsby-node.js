const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const propertyTemplate = path.resolve("./src/templates/property.js")
  // Get data from query
  const res = await graphql(`
    query {
      allProperty {
        edges {
          node {
            listing_id
          }
        }
      }
    }
  `)
  // Create new pages
  res.data.allProperty.edges.forEach(edge => {
    createPage({
      component: propertyTemplate,
      path: `/property/${edge.node.listing_id}`,
      context: {
        slug: edge.node.listing_id,
      },
    })
  })
}

const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `ReviewsYaml`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
