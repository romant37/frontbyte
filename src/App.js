import React from 'react'
import { Provider } from 'react-redux'
import Root from './Root'
import configureStore from './store'
import 'normalize.css'
import 'antd/dist/antd.css'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

export default App
