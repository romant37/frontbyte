import React from 'react'
import renderer from 'react-test-renderer'
import RouteChangeProgress from './RouteChangeProgress'

test('RouteChangeProgress', () => {
  const component = renderer.create(<RouteChangeProgress />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
