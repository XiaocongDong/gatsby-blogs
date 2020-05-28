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

const padding = 10

const Item = ({ title, url, level, items = [] }) => {
  return <div
    style={{
      paddingLeft: `${level * padding}px`,
      margin: '10px 0',
    }}>
    <div style={{fontSize: '16px'}}>{title}</div>
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
