import React from 'react'
import Link from '../components/Link'
import styled from 'styled-components'

const Card = styled.div`
  margin-bottom: 2em;
`

const StyledTitle = styled(Link)`
  font-size: 32px;
  text-decoration: none;
  color: black;
`

const StyledExcerpt = styled.p`
  color: #555;
  font-size: 20px;
  line-height: 1.8;
`

const StyledBody = styled.div`
  display: flex;
  color: #777;
  padding: 10px 0;
  font-size: 16px;
`

const StyledDate = styled.div`
  margin-right: 1em;
`

const StyledLink = styled(Link)`
  margin-right: 0.6em;
  color: #333;
  text-decoration: underline;

  &:hover {
    color: #000;
  }

  &::before{
    content: '#';
    text-decoration: none;
  }
`

export default ({ slug, title, date, excerpt, tags }) => {
  tags = tags || []

  return (
    <Card>
      <StyledTitle to={slug}>{title}</StyledTitle>
      <StyledBody>
        <StyledDate>{date}</StyledDate>
        {
          tags.map(tag => <StyledLink key={tag} to={`/tags/${tag}`}>{tag}</StyledLink>)
        }
      </StyledBody>
      <StyledExcerpt
        dangerouslySetInnerHTML={{__html: excerpt}}
      />
    </Card>
  )
}
