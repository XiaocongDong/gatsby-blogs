import React from "react"
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogCard from '../components/BlogCard'

export default ({ data }) => {
  const blogs = data.allMarkdownRemark.edges

  return <Layout>
    <div>
      {
        blogs.map(({node: { id, frontmatter: { title, date }, fields: { slug }, excerpt }}) => {
          return <BlogCard
            key={id}
            slug={slug}
            title={title}
            date={date}
            excerpt={excerpt}
          />
        })
      }
    </div>
  </Layout>
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          html
          headings {
            depth
            value
          }
          tableOfContents
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY年MM月DD日")
          }
        }
      }
    }
  }
`