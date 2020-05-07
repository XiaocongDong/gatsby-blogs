import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import tw from 'twin.macro'

const ListLink = ({ to, children }) => (
  <li className="ml-8">
    <Link to={to} className="text-xl text-gray-600">{children}</Link>
  </li>
)

const Content = styled.div`
`

const StyledHeader = styled.header`
  ${tw`fixed top-0 left-0 right-0 h-20 shadow-xs `}
  ${tw`flex items-center justify-between`}
  ${tw`font-medium text-3xl`}
  padding: 0 10vw;
`

const StyledContent = styled.div`
  padding: 0 10vw;
  ${tw`h-screen pt-24`}
`

export default ({ children }) => {
  return (
    <Content>
      <StyledHeader>
        <Link to="/" style={{ textShadow: 'none', backgroundImage: 'none' }}>
          <h3 style={{ display: 'inline' }}>Sean Dong</h3>
        </Link>
        <ul className="flex">
          <ListLink to="/">博客</ListLink>
          <ListLink to="/about">关于</ListLink>
          <ListLink to="/contact">联系我</ListLink>
        </ul>
      </StyledHeader>
      <StyledContent>
        { children }
      </StyledContent>
    </Content>
  )
}
