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
      }
    })
    return <WrappedComponent {...props} segments={childrenAsSegments} />
  }
}

export default withLayout
