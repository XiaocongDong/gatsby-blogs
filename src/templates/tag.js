import React from 'react'
import Layout from '../components/Layout'
import Link from '../components/Link'

export default ({ pageContext }) => {
  const { posts, tagName } = pageContext
  const len = posts.length

  return (
    <Layout>
      <h2>关于{tagName}的标签有{len}个</h2>
      <div>
        {
          posts.map(post => {
            return <Link key={post.id} to={post.fields.slug}>{post.frontmatter.title}</Link>
          })
        }
      </div>
    </Layout>
  )
}
