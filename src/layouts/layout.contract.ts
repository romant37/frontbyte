import { ReactElement } from 'react'
import { AppLayoutSegments } from './AppLayout'
import { MainGridLayoutSegments } from './MainGridLayout'

export type AvailableSegmentsUnion = AppLayoutSegments | MainGridLayoutSegments

export type AppLayoutSegmentProps = BaseLayoutSegmentProps<AppLayoutSegments>
export type MainGridLayoutSegmentsProps = BaseLayoutSegmentProps<
  MainGridLayoutSegments
>
export type AvailableLayoutsProps =
  | AppLayoutSegmentProps
  | MainGridLayoutSegmentsProps

export type BaseLayoutSegmentProps<T extends AvailableSegmentsUnion> = {
  segmentId: T
  groupId?: T
}

export type LayoutSegments<T extends AvailableSegmentsUnion> = {
  [segmentId in T]: ReactElement
}

export type LayoutProps<T extends AvailableSegmentsUnion> = {
  className?: string
  segments?: LayoutSegments<T>
  groups?: LayoutSegments<T>
}

export type ExtendedWithChildrenProps<T extends AvailableSegmentsUnion> = {
  children?: ReactElement | ReactElement[]
} & LayoutProps<T>
