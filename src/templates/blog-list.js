import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import Img from 'gatsby-image'

export default ({ data, pageContext }) => {
  const posts = data.allMdx.edges
  const image = data.file.childImageSharp
  const { numPages, currentPage } = pageContext

  const articles = [
    'JavaScript小技巧 - 数组篇',
    '2011年12月24日只言片语',
    '2011年12月25日只言片语',
    '2011年12月26日只言片语'
  ]

  return <Layout>
    <Helmet title="Sean Dong的个人博客"/>
    <div className="flex">
      <div>
        {
          posts.map(({
            node: {
              id,
              frontmatter: {
                title,
                date,
                tags
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
            />
          })
        }
        <div>
          {currentPage !== 1 && <Link to={currentPage === 2 ? `/` : `/blogs/${currentPage - 1}`}>上一页</Link>}
          {currentPage !== numPages && <Link to={`/blogs/${currentPage + 1}`}>下一页</Link>}
        </div>
      </div>
      <div className="flex-shrink-0 w-1/4 pl-8">
        <div>
          <div className="text-gray-500 text-xl">热门文章</div>
          {
            articles.map(article => 
              <div key={article} className="text-gray-600 text-lg hover:text-gray-900 mt-2">
                {article}
              </div>
            )
          }
        </div>
        <div>
          <Img
            className="transform -translate-x-4 mt-4"
            fixed={image.fixed}
            alt="headshot"
          />
          <div className="text-gray-700">关注我的公众号</div>
        </div>
      </div>
    </div>
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
