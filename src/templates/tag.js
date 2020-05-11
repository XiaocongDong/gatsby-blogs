import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'gatsby'

export default ({ pageContext }) => {
  const { posts, tagName } = pageContext
  const len = posts.length

  return (
    <Layout>
      <div>关于{tagName}的标签有{len}个</div>
      <ul>
        {
          posts.map(post => {
            return <Link key={post.id} to={post.fields.slug}>{post.frontmatter.title}</Link>
          })
        }
      </ul>
    </Layout>
  )
}
