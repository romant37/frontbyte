import React from 'react'
import { Container, Row, Col } from 'styled-bootstrap-grid'
import { Red, Blue, Gold } from './styles'

const ARR_LENGHT = 23
const ARRAY = []
for (let i = 0; i < ARR_LENGHT; i++) {
  ARRAY.push(i)
}

const Test = () => (
  <div>
    <Container>
      <Row>
        <Col col xl='5' lg='7' md='9' sm='12' xs='24'>
          <Red />
        </Col>
        <Col col xl='10' lg='7' md='3' sm='12' xs='24'>
          <Blue />
        </Col>
        <Col col xl='9' lg='10' md='12' sm='24'>
          <Gold />
        </Col>
      </Row>
    </Container>
    <br />
    <Container fluid>
      <Row>
        <Col col xl='5' lg='7' md='9' sm='12' xs='24'>
          <Red />
        </Col>
        <Col col xl='10' lg='7' md='3' sm='12' xs='24'>
          <Blue />
        </Col>
        <Col col xl='9' lg='10' md='12' sm='24'>
          <Gold />
        </Col>
      </Row>
    </Container>
    <br />
    <Container>
      <Row>
        {ARRAY.map(() => (
          <Col col xl='3' lg='4' md='6' sm='12' xs='24'>
            <Red />
          </Col>
        ))}
      </Row>
    </Container>
  </div>
)

export default Test
