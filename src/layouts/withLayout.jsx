import React, { PureComponent, Children } from 'react'

const groupChildrenByKey = children => {
  const blocks = { unnamed: [], withkey: [] }
  Children.forEach(children, child => {
    if (!child) return
    if (child.key) {
      blocks[child.key] = child
      blocks.withkey.push(child)
    } else {
      blocks.unnamed.push(child)
    }
  })
  return blocks
}

export default function withLayout(WrappedComponent) {
  return class extends PureComponent {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          blocks={groupChildrenByKey(this.props.children)}
        />
      )
    }
  }
}
