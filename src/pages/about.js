import React from 'react'
import Layout from '../components/Layout'
import styled from 'styled-components'

const StyledHeader = styled.header`
  color: red;
`

export default () => {
  return (
    <Layout>
      <StyledHeader>关于我</StyledHeader>
    </Layout>
  )
}