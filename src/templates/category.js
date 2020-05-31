import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Link from '../components/Link'

const List = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
`

const StyledLink = styled(Link)`
  font-size: 24px;
  margin: 10px 0;
  color: ${props => props.theme.color.blue};
  
  &:hover {
    color: ${props => props.theme.color.blue};
  }
`

export default ({ pageContext }) => {
  const { posts, categoryName } = pageContext

  return (
    <Layout>
      <h2>分类：{categoryName}</h2>
      <List>
        {
          posts.map(post => {
            return <StyledLink
              key={post.id}
              to={post.fields.slug}
            >
              {post.frontmatter.title}
            </StyledLink>
          })
        }
      </List>
    </Layout>
  )
}
