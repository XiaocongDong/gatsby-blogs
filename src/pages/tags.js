import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Link from '../components/Link'
import styled from 'styled-components'

const Container = styled.div`
`

const StyledLink = styled(Link)`
  background-color: ${props => props.theme.color.blue};
  color: white;
  border-radius: 2px;
  padding: 2px;
  margin-right: 2px;
`

export default ({ data }) => {
  const { tags } = data

  return <Layout>
    <Container>
      {
        tags.group.map(tag => <StyledLink key={tag.name} to={`/tags/${tag.name}`}>
          {tag.name}: {tag.totalCount}
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
