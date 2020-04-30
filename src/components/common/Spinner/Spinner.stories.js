import React from 'react'
import Spinner from '.'

export default {
  title: 'Spinner',
  component: Spinner,
}

export const Default = () => (
  <div style={{ width: 300, height: 300, position: 'relative' }}>
    <Spinner />
  </div>
)
