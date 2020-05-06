import styled from 'styled-components'
import { media } from 'styled-bootstrap-grid'

export const Inner = styled.div`
  margin-top: 16px;
`

export const Red = styled(Inner)`
  background-color: red;
  height: 100px;
`

export const Blue = styled(Inner)`
  background-color: blue;
  height: 100px;
`

export const Gold = styled(Inner)`
  background-color: gold;
  height: 100px;
  
  ${media.xs`
    background-color: gold;
  `}
  ${media.sm`
    background-color: orange;
  `}
  ${media.md`
    background-color: gold;
  `}
  ${media.lg`
    background-color: purple;
  `}
  ${media.xl`
    background-color: yellow;
  `}
  ${media.xxl`
    background-color: orange;
  `}
`
