const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    let slug = createFilePath({ node, getNode, basePath: 'blogs' })
    const dateStr = node.frontmatter.date
    if (dateStr) {
      const date = new Date(dateStr)
      slug = `/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + slug
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug } = node.fields
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug
      }
    })
  })
}