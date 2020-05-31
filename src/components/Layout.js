import React from 'react'
import Link from '../components/Link'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../themes/theme'

const Content = styled.div`
  height: 100%;
  box-sizing: border-box;
`

const Header = styled.header`
  padding: 0 10vw;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  z-index: 1;
`

const Title = styled(Link)`
  font-size: 36px;
  margin-right: 1em;
  color: #000;
  letter-spacing: 8px;
  font-weight: 800;
`

const StyledContent = styled.div`
  padding: 0 10vw;
  padding-top: 140px;
  min-height: calc(100% - 168px);
  box-sizing: border-box;
  padding-bottom: 50px;
`

const LinkList = styled.ul`
  display: flex;
`

const Nav = styled(Link)`
  margin: 0 1em;
  color: #777;
  text-transform: uppercase;
`

const Footer = styled.div`
  font-size: 14px;
  border-top: 1px solid #eceff2;
  height: 168px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  line-height: 2;
`

const Mask = styled.div`
  color: #777;
`

const A = styled.a`
  color: ${props => props.theme.color.blue};
  text-decoration: none;
`

export default ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Content>
        <Header>
          <Title to="/" style={{ textShadow: 'none', backgroundImage: 'none' }}>
            进击的大葱
          </Title>
          <LinkList>
            <Nav to="/">Blogs</Nav>
            <Nav to="/categories">Categories</Nav>
            <Nav to="/tags">Tags</Nav>
            <Nav to="/achieves">Achieves</Nav>
            <Nav to="/about">About</Nav>
          </LinkList>
        </Header>
        <StyledContent>
          { children }
        </StyledContent>
        <Footer>
          <Mask>{`2019 - ${new Date(Date.now()).getFullYear()} 进击的大葱`}</Mask>
          <Mask>Powered by <A href="https://gatsbyjs.org">Gatsby</A></Mask>
        </Footer>
      </Content>
    </ThemeProvider>
  )
}
