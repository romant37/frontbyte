import { ReactElement } from 'react'
import { AppLayoutSegments } from './AppLayout'

export type AvailableSegmentsUnion = AppLayoutSegments

export type AppLayoutSegmentProps = BaseLayoutSegmentProps<AppLayoutSegments>

export type AvailableLayoutsProps = AppLayoutSegmentProps

export type BaseLayoutSegmentProps<T extends AvailableSegmentsUnion> = {
  segmentId: T
}

export type LayoutSegments<T extends AvailableSegmentsUnion> = {
  [segmentId in T]: ReactElement
}

export type LayoutProps<T extends AvailableSegmentsUnion> = {
  className?: string
  segments?: LayoutSegments<T>
}

export type ExtendedWithChildrenProps<T extends AvailableSegmentsUnion> = {
  children?: ReactElement | ReactElement[]
} & LayoutProps<T>
