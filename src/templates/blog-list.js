import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'

export default ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { numPages, currentPage } = pageContext

  return <Layout>
    <Helmet title="Sean Dong的个人博客"/>
    <div>
      {
        posts.map(({
          node: {
            id,
            frontmatter: {
              title,
              date,
              tags
            },
            fields: { 
              slug 
            }, 
            excerpt
          }
        }) => {
          return <BlogCard
            slug={slug}
            key={id}
            title={title}
            date={date}
            excerpt={excerpt}
            tags={tags}
          />
        })
      }
    </div>
    <div>
      {currentPage !== 1 && <Link to={currentPage === 2 ? `/` : `/blogs/${currentPage - 1}`}>上一页</Link>}
      {currentPage !== numPages && <Link to={`/blogs/${currentPage + 1}`}>下一页</Link>}
    </div>
  </Layout>
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
          }
          excerpt
        }
      }
    }
  }
`
