import { Link } from 'gatsby'
import styled from 'styled-components'

export default styled(Link)`
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.color.blue}
  }
`