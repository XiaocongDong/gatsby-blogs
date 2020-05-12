import React from 'react'
import { graphql } from 'gatsby'
// import styled from 'styled-components'
// import tw from 'twin.macro'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { Header1, Header2, Header3 } from '../components/MD/Header'
import CodeBlock from '../components/MD/CodeBlock'
import { UL, LI } from '../components/MD/List'
import P from '../components/MD/P'

export default ({ data, pageContext }) => {
  const post = data.mdx

  const { prev, next } = pageContext
  return <Layout>
    <Helmet title={post.frontmatter.title}/>
    <h1 className="font-bold text-4xl">{post.frontmatter.title}</h1>
    <div>
      {/* <div
        className="markdown flex-grow"
        dangerouslySetInnerHTML={{ __html: post.html}}
      /> */}
      <MDXProvider
        components={{
          h1: Header1,
          h2: Header2,
          h3: Header3,
          ul: UL,
          li: LI,
          code: CodeBlock,
          p: P
        }}
      >
        <MDXRenderer
        >
          {post.body}
        </MDXRenderer>
      </MDXProvider>
    </div>
    <div className="flex mt-1">
      {prev && <div>{prev.frontmatter.title}</div>}
      {next && <div>{next.frontmatter.title}</div>}
    </div>
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
