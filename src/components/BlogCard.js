import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import tw from 'twin.macro'

const Card = styled.div`
  ${tw`mb-12`}
`

const StyledTitle = styled(Link)`
  ${tw`text-2xl font-semibold pb-3`}
`

const StyledDate = styled.div`
  ${tw`text-gray-400`}
`

const StyledExcerpt = styled.p`
  ${tw`text-lg text-gray-600 mb-4`}
`

export default (props) => {
  return (
    <Card>
      <StyledTitle to={props.slug}>{props.title}</StyledTitle>
      <StyledDate>{props.date}</StyledDate>
      <StyledExcerpt>{props.excerpt}</StyledExcerpt>
    </Card>
  )
}
