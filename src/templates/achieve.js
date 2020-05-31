import React from 'react'
import styled from 'styled-components'
import Link from '../components/Link'
import Layout from '../components/Layout'

const StyledLink = styled(Link)`
  font-size: 24px;
  margin: 10px 0;
  color: ${props => props.theme.color.blue};
  
  &:hover {
    color: ${props => props.theme.color.blue};
  }
`

const Nav = styled(Link)`
  font-size: 24px;
  margin-left: 10px;
  color: ${props => props.theme.color.blue};
  
  &:hover {
    color: ${props => props.theme.color.blue};
  }
`

const YearAchieves = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
  margin-bottom: 20px;
`

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4em;
`

export default ({ pageContext }) => {
  const { achievedYearBlogs, currentPage, totalPage } = pageContext

  return (
    <Layout>
      <h2>Achieves</h2>
      {
        achievedYearBlogs.map(({ year, blogs })=> {
          return (
            <YearAchieves>
              <h3 key={year}>{year}</h3>
              {
                blogs.map(({ node }) => <StyledLink key={node.id} to={node.fields.slug}>{node.frontmatter.title}</StyledLink>)
              }
            </YearAchieves>
          )
        })
      }
      <Pagination>
        {currentPage !== 1 && <Nav to={currentPage === 2 ? `/achieves` : `/achieves/${currentPage - 1}`}>上一页</Nav>}
        {currentPage !== totalPage && <Nav to={`/achieves/${currentPage + 1}`}>下一页</Nav>}
      </Pagination>
    </Layout>
  )
}
