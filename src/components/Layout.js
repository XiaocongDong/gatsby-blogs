import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const ListLink = ({ to, children }) => (
  <li style={{ display: 'inline-block', marginRight: '1rem' }}>
    <Link to={to}>{children}</Link>
  </li>
)

const Content = styled.div`
`

const StyledHeader = styled.header`
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 64px;
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.1);
`

const StyledContent = styled.div`
  height: 100%;
  padding-top: 64px;
  width: 100%;
`

export default ({ children }) => {
  return (
    <Content>
      <StyledHeader>
        <Link to="/" style={{ textShadow: 'none', backgroundImage: 'none' }}>
          <h3 style={{ display: 'inline' }}>超级肖恩</h3>
        </Link>
        <ul style={{ listStyle: 'none', float: 'right' }}>
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
