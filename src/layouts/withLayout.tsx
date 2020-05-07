import React, { ComponentType, ReactElement } from 'react'
import {
  ExtendedWithChildrenProps,
  LayoutProps,
  AvailableSegmentsUnion,
  BaseLayoutSegmentProps,
  LayoutSegments,
} from './layout.contract'

type ChildComponent = ReactElement<
  BaseLayoutSegmentProps<AvailableSegmentsUnion>
>

const withLayout = (
  WrappedComponent: ComponentType<LayoutProps<AvailableSegmentsUnion>>
) => {
  return (props: ExtendedWithChildrenProps<AvailableSegmentsUnion>) => {
    const childrenAsSegments = {} as LayoutSegments<AvailableSegmentsUnion>
    const restChildren: Array<any> = []
    if (!props.children) {
      return <WrappedComponent {...props} />
    }
    const children = Array.isArray(props.children)
      ? props.children
      : [props.children]

    children.forEach((element: ChildComponent) => {
      const segmentId = element.props.segmentId
      if (segmentId) {
        childrenAsSegments[segmentId] = element
      } else {
        restChildren.push(element)
      }
    })

    console.log('withLayout', props.children)
    return (
      <WrappedComponent
        {...props}
        segments={childrenAsSegments}
        children={restChildren}
      />
    )
  }
}

export default withLayout
