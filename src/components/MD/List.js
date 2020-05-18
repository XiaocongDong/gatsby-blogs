import styled from 'styled-components'

export const OL = styled.ol`
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;

  ul {
    list-style: lower-roman;
  }
`

export const UL = styled.ul`
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;

  ol {
    list-style: lower-roman;
  }
`

export const LI = styled.li`
  word-break: break-all;

  + li {
    margin-top: .25em;
  }

  p {
    margin-top: 16px;
  }
`