import React from 'react'
import { Container, Row } from 'styled-bootstrap-grid'
import { LayoutProps } from '../layout.contract'
import withLayout from '../withLayout'

export type MainGridLayoutSegments = 'content'
type InternalLayoutProps = LayoutProps<MainGridLayoutSegments>

const MainGridLayout = ({ children }: any) => {
  return (
    <Container fluid>
      <Row>{children}</Row>
    </Container>
  )
}

export default withLayout(MainGridLayout)
