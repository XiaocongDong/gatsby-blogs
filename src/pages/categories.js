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
  const { categories } = data

  return <Layout>
    <Container>
      {
        categories.group.map(category => <StyledLink key={category.name} to={`/categories/${category.name}`}>
          {category.name} ({category.totalCount})
        </StyledLink>
        )
      }  
    </Container>
  </Layout>
}

export const query = graphql`
  {
    categories: allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
      group(field: frontmatter___categories) {
        name: fieldValue
        totalCount
      }
    }
  }
`
