import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

const render = (RootComponent: any) =>
  ReactDOM.render(
    React.createElement(RootComponent),
    document.getElementById('root')
  )

render(Root)

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default
    render(NextApp)
  })
}
