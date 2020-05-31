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

const createAchievesPages = (createPage, posts) => {
  const blogsPerPage = 10
  const totalPage = posts.length
  const pages = [[]]

  let counter = 1
  for (let i = 0; i < totalPage; i++) {
    if (counter > blogsPerPage) {
      counter = 1
      pages.push([])
    }
    pages[pages.length - 1].push(posts[i])
    counter++
  }

  const achievedPages = []
  for (let i = 0; i < pages.length; i++) {
    const pageAchievedBlogs = []
    const pageBlogs = pages[i]
    if (pageBlogs.length == 0) {
      break
    }

    for (let j = 0; j < pageBlogs.length; j++) {
      const pageBlog = pageBlogs[j]
      const blogYear = new Date(pageBlog.node.frontmatter.date).getFullYear()
    
      if (pageAchievedBlogs.length == 0) {
        pageAchievedBlogs.push({year: blogYear, blogs: []})
      }

      let currentAchievedBlogs = pageAchievedBlogs[pageAchievedBlogs.length - 1]
      if (currentAchievedBlogs.year == blogYear) {
        currentAchievedBlogs.blogs.push(pageBlog)
      } else {
        currentAchievedBlogs = {year: blogYear, blogs: [pageBlog]}
        pageAchievedBlogs.push(currentAchievedBlogs)
      }
    }

    achievedPages.push(pageAchievedBlogs)
  }

  achievedPages.forEach((pageAchievedBlogs, index) => {
    createPage({
      path: index === 0 ? `/achieves` : `achieves/${index + 1}`,
      component: path.resolve(`./src/templates/achieve.js`),
      context: {
        achievedYearBlogs: pageAchievedBlogs,
        currentPage: index + 1,
        totalPage: pages.length
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
      allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
        edges {
          node {
            id
            frontmatter {
              title
              tags
              categories
              date
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
  // generate achieve page
  createAchievesPages(createPage, blogs)
}
