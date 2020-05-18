import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
// import styled from 'styled-components'
// import tw from 'twin.macro'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import CodeBlock from '../components/MD/CodeBlock'
import Link from '../components/MD/Link'
import StyledLink from '../components/Link'
import { H1, H2, H3, H4, H5, H6 } from '../components/MD/Header'
import P from '../components/MD/P'
import Image from '../components/MD/Image'
import { LI, OL, UL } from '../components/MD/List'

import Img from 'gatsby-image'

const NavLink = styled(StyledLink)`
  margin-right: 1em;
  background: #f3f3f3;
  padding: 8px 18px;
  color: #333;
  font-size: 16px;
  border-radius: 8px;
`

const Footer = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 50px;
  font-weight: 400;
  margin-bottom: 128px;
  margin-top: 18px;
`

const Content = styled.div`
  display: flex;
`

const Left = styled.div`
  flex-shrink: auto;
  flex-grow: 1;
  width: 60%;
  font-size: 20px;
`

const Right = styled.div`
  flex-shrink: 0;
  width: 40%;
  padding-left: 60px;
  box-sizing: border-box;
`

const StyledImg = styled(Img)`
  width: 100px;
  height: 100px;
`

const ImgContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  background-color: #f8f8f8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ImgText = styled.div`
  margin-left: 18px;
  font-family: serif;
`

export default ({ data, pageContext }) => {
  const post = data.mdx
  const image = data.file.childImageSharp

  const { prev, next } = pageContext
  return <Layout>
    <Helmet title={post.frontmatter.title}/>
    <Title>{post.frontmatter.title}</Title>
    <Content>
      <Left>
        <div className="markdown-body">
          <MDXProvider
            components={{
              h1: H1,
              h2: H2,
              h3: H3,
              h4: H4,
              h5: H5,
              h6: H6,
              p: P,
              li: LI,
              ul: UL,
              ol: OL,
              img: Image,
              code: CodeBlock,
              a: Link
            }}
          >
            <MDXRenderer
            >
              {post.body}
            </MDXRenderer>
          </MDXProvider>
        </div>
      </Left>
      <Right>
        <ImgContainer>
          <StyledImg
            fixed={image.fixed}
            alt="headshot"
          />
          <ImgText>关注我的公众号</ImgText>
        </ImgContainer>
      </Right>
    </Content>
    <Footer>
      {prev && <NavLink to={prev.fields.slug}>&laquo; 上一篇：{prev.frontmatter.title}</NavLink>}
      {next && <NavLink to={next.fields.slug}>下一篇：{next.frontmatter.title} &raquo;</NavLink>}
    </Footer>
  </Layout>
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug }}) {
      excerpt
      frontmatter {
        title
        date
      }
      body
    }
    file(relativePath: {eq: "etc/wechat_qr.jpg"}) {
      childImageSharp {
        fixed(width: 240, height: 240) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
