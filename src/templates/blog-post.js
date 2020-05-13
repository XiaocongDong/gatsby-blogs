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

const NavLink = styled(StyledLink)`
  margin-right: 1em;
  color: ${props => props.theme.color.blue};
`

const Footer = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
  display: flex;
  justify-content: space-between;
`

export default ({ data, pageContext }) => {
  const post = data.mdx

  const { prev, next } = pageContext
  return <Layout>
    <Helmet title={post.frontmatter.title}/>
    <h1>{post.frontmatter.title}</h1>
    <div>
      <MDXProvider
        components={{
          // h1: Header1,
          // h2: Header2,
          // h3: Header3,
          // ul: UL,
          // li: LI,
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
    <Footer>
      {prev && <NavLink to={prev.fields.slug}>上一篇：{prev.frontmatter.title}</NavLink>}
      {next && <NavLink to={next.fields.slug}>下一篇：{next.frontmatter.title}</NavLink>}
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
  }
`
