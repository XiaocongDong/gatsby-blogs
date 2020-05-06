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
      <p>
        Too young, too simple, sometimes naive
      </p>
      <img
        src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
        alt="panda bamboo"
      />
    </Layout>
  )
}