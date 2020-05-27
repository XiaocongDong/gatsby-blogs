import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 20px;
`

const StyledTitle = styled.div`
  font-size: 30px;
`

const fontSizes = [18, 14, 10]
const padding = 10

const Item = ({ title, url, level, items = [] }) => {
  const fontSize = fontSizes[level]

  return <div
    style={{
      paddingLeft: `${level * padding}px`,
      margin: '10px 0',
      fontWeight: level === 0 ? 'bold' : 400,
    }}>
    <div style={{fontSize: `${fontSize}px`}}>{title}</div>
    <div>
      {
        items.map(({ title, url, items }) => {
          return <Item
            key={url}
            level={level + 1}
            title={title}
            url={url}
            items={items}
          />
        })
      }
    </div>
  </div>
}

export default ({ items = [] }) => {
  return <Root>
    <StyledTitle>文章目录</StyledTitle>
    {
      items.map(({ title, url, items }) => <Item
        key={url}
        level={0}
        title={title}
        url={url}
        items={items}
      />)
    }
  </Root>
}
