const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

const createTagPages = (createPage, posts) => {
  const tagTemplate = path.resolve(`./src/templates/tag.js`)
  const postsMap = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsMap[tag]) {
          postsMap[tag] = []
        }
        postsMap[tag].push(node)
      })
    }
  })

  Object.keys(postsMap).forEach(tagName => {
    createPage({
      path: `/tags/${tagName}`,
      component: tagTemplate,
      context: {
        posts: postsMap[tagName],
        tagName
      }
    })
  })
}

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
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 2000
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  
  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 2
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `blogs/${i + 1}`,
      component: path.resolve(`./src/templates/blog-list.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
  // generate blog post
  posts.forEach(({ node }, index) => {
    const { slug } = node.fields

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1? null : posts[index + 1].node
      }
    })
  })

  // generate tag detail page
  createTagPages(createPage, posts)
}
