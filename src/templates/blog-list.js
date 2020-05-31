import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Link from '../components/Link'
import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4em;
`

const Body = styled.div`
  display: flex;
`

const StyledLink = styled(Link)`
  font-size: 16px;
  margin-left: 1em;
  color: ${props => props.theme.color.blue};
  
  &:hover {
    color: ${props => props.theme.color.blue};
  }
`

const PostsContainer = styled.div`
`

const SideCard = styled.div`
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
  position: sticky;
  top: 200px;
`

const ImgText = styled.div`
  margin-left: 18px;
  font-family: serif;
`

export default ({ data, pageContext }) => {
  const posts = data.allMdx.edges
  const image = data.file.childImageSharp
  const { numPages, currentPage } = pageContext

  return <Layout>
    <Helmet title="进击的大葱的个人博客"/>
    <Body>
      <PostsContainer>
        {
          posts.map(({
            node: {
              id,
              frontmatter: {
                title,
                date,
                tags,
                categories
              },
              fields: { 
                slug 
              }, 
              excerpt
            }
          }) => {
            return <BlogCard
              slug={slug}
              key={id}
              title={title}
              date={date}
              excerpt={excerpt}
              tags={tags}
              categories={categories}
            />
          })
        }
        <Pagination>
          {currentPage !== 1 && <StyledLink to={currentPage === 2 ? `/` : `/blogs/${currentPage - 1}`}><FontAwesomeIcon icon={faAngleLeft}/>上一页</StyledLink>}
          {currentPage !== numPages && <StyledLink to={`/blogs/${currentPage + 1}`}>下一页</StyledLink>}
        </Pagination>
      </PostsContainer>
      <SideCard>
        <ImgContainer>
          <StyledImg
            fixed={image.fixed}
            alt="headshot"
          />
          <ImgText>关注我的公众号</ImgText>
        </ImgContainer>
      </SideCard>
    </Body>
  </Layout>
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            tags
            categories
          }
          excerpt
        }
      }
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
