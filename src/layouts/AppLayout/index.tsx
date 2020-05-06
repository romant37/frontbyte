import React from 'react'
import { LayoutProps } from '../layout.contract'
import withLayout from '../withLayout'
import Sidebar from 'layouts/SidebarLayout'
import { Root, Content } from './styles'

export type AppLayoutSegments = 'sidebar' | 'content'
type InternalLayoutProps = LayoutProps<AppLayoutSegments>

const MainLayout = ({ segments }: InternalLayoutProps) => {
  return (
    <Root>
      <>{segments?.sidebar || <Sidebar />}</>
      <Content>{segments?.content}</Content>
    </Root>
  )
}

export default withLayout(MainLayout)
