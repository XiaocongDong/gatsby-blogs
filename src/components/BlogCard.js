import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import tw from 'twin.macro'

const Card = styled.div`
  ${tw`mb-12`}
`

const StyledTitle = styled(Link)`
  ${tw`text-2xl font-medium`}
`

const StyledExcerpt = styled.p`
  ${tw`text-xl text-gray-700 mb-4`}
`

export default ({ slug, title, date, excerpt, tags, categories }) => {
  tags = tags || []
  categories = categories || []

  return (
    <Card>
      <StyledTitle to={slug}>{title}</StyledTitle>
      <div className="flex text-gray-500 pt-2 pb-1">
        <div className="mr-2">{date}</div>
        <div className="flex">
        {
          categories.map(category => <div key={category} className="mr-1 last:mr-2">{category}</div>)
        }
        </div>
        {
          tags.map(tag => <div key={tag} className="mr-1">#{tag}</div>)
        }
      </div>
      <StyledExcerpt>{excerpt}</StyledExcerpt>
    </Card>
  )
}
