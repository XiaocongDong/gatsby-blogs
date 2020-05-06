import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Card = styled.div`
  margin: 1em 0;
`

export default (props) => {
  return (
    <Card>
      <Link to={props.slug}>{props.title}</Link>
      <p>{props.excerpt}</p>
      <p>{props.date}</p>
    </Card>
  )
}
