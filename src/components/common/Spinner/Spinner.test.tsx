import React from 'react'
import renderer from 'react-test-renderer'
import Spinner from './Spinner'

test('Spinner', () => {
  const component = renderer.create(<Spinner />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
