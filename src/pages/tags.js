import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Link from '../components/Link'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledLink = styled(Link)`
  background-color: #f8f8f8;
  border-radius: 15px;
  padding: 10px;
  margin: 10px 6px;
  color: #999;
`
export default ({ data }) => {
  const { tags } = data

  return <Layout>
    <Container>
      {
        tags.group.map(tag => <StyledLink key={tag.name} to={`/tags/${tag.name}`}>
          {tag.name} ({tag.totalCount})
        </StyledLink>
        )
      }  
    </Container>
  </Layout>
}

export const query = graphql`
  {
    tags: allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
      group(field: frontmatter___tags) {
        name: fieldValue
        totalCount
      }
    }
  }
`
