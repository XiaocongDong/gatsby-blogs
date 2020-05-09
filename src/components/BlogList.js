import React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import BlogCard from '../components/BlogCard'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            html
            tableOfContents
            timeToRead
            excerpt(format: HTML)
            fields {
              slug
            }
            frontmatter {
              title
              date(fromNow: true, locale: "zh-cn")
              tags
            }
          }
        }
      }
    }`)
  const blogs = data.allMarkdownRemark.edges
  
  return (
    <div>
      {
        blogs.map(({
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
  )
}
