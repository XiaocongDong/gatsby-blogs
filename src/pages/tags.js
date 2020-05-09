import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

export default ({ data }) => {
  const { tags } = data

  return <Layout>
    <ul>
      {
        tags.group.map(tag => <Link key={tag.name} to={`/tags/${tag.name}`}>
          {tag.name}: {tag.totalCount}
        </Link>
        )
      }  
    </ul>
  </Layout>
}

export const query = graphql`
  {
    tags: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      group(field: frontmatter___tags) {
        name: fieldValue
        totalCount
      }
    }
  }
`
