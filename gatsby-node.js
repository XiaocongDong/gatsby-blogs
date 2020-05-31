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

const createCategoryPages = (createPage, posts) => {
  const categoryTemplate = path.resolve(`./src/templates/category.js`)
  const postsMap = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.categories) {
      node.frontmatter.categories.forEach(category => {
        if (!postsMap[category]) {
          postsMap[category] = []
        }
        postsMap[category].push(node)
      })
    }
  })

  Object.keys(postsMap).forEach(categoryName => {
    createPage({
      path: `/categories/${categoryName}`,
      component: categoryTemplate,
      context: {
        posts: postsMap[categoryName],
        categoryName
      }
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const { sourceInstanceName } = getNode(node.parent)

    let slug = ''
    switch (sourceInstanceName) {
      case 'blogs':
        slug = createFilePath({ node, getNode, basePath: 'blogs' })
        const dateStr = node.frontmatter.date
        if (dateStr) {
          const date = new Date(dateStr)
          slug = `/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` + slug
        }

        createNodeField({
          node,
          name: 'slug',
          value: slug
        })
        createNodeField({
          node,
          name: 'type',
          value: 'blog'
        })
      default:
        break
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              title
              tags
              categories
            }
            fields {
              slug
              type
            }
          }
        }
      }
    }
  `)
  
  const blogs = result.data.allMdx.edges.filter(edge => edge.node.fields.type == 'blog')
  const blogsPerPage = 6
  const numPages = Math.ceil(blogs.length / blogsPerPage)

  // generate blog list
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `blogs/${i + 1}`,
      component: path.resolve(`./src/templates/blog-list.js`),
      context: {
        limit: blogsPerPage,
        skip: i * blogsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })

  // generate blog post
  blogs.forEach(({ node }, index) => {
    const { slug } = node.fields

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug,
        prev: index === 0 ? null : blogs[index - 1].node,
        next: index === blogs.length - 1? null : blogs[index + 1].node
      }
    })
  })

  // generate tag detail page
  createTagPages(createPage, blogs)

  // generate category detail page
  createCategoryPages(createPage, blogs)
}
