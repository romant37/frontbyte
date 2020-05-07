import React from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { LayoutProps } from '../layout.contract'
import withLayout from '../withLayout'

export type MainGridLayoutSegments = 'content'
type InternalLayoutProps = LayoutProps<MainGridLayoutSegments>

const MainGridLayout = ({ groups }: any) => {
  return (
    <Container fluid>
      <Row>
        {groups?.content.map((item: any) => (
          <Col xl='4' md='6' xs='12' key={item.key}>
            {item}
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default withLayout(MainGridLayout)
