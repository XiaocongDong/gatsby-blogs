import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'

const StyledTableOfContent = styled.div`
  li {
    ${tw`text-gray-600 hover:text-gray-900 mb-1`}
  }
`

export default ({ data, pageContext }) => {
  const post = data.markdownRemark
  console.log(pageContext)
  const { prev, next } = pageContext
  return <Layout>
    <Helmet title={post.frontmatter.title}/>
    <h1>{post.frontmatter.title}</h1>
    <div className="flex">
      <div
        className="markdown flex-grow"
        dangerouslySetInnerHTML={{ __html: post.html}}
      />
      <div className="w-1/4 flex-shrink-0 pl-8">
        <div className="text-lg">本章内容</div>
        <StyledTableOfContent
          dangerouslySetInnerHTML={{__html: post.tableOfContents}}
        />
      </div>
    </div>
    <div className="flex">
      {prev && <div>{prev.frontmatter.title}</div>}
      {next && <div>{next.frontmatter.title}</div>}
    </div>
  </Layout>
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      tableOfContents
      frontmatter {
        title
      }
    }
  }
`
