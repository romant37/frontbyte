/* eslint no-underscore-dangle: "off" */
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import payloadMiddleware from './middlewares/payloadMiddleware'
import reducers from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  thunk,
  sagaMiddleware,
  payloadMiddleware,
]

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
}

const configureStore = () => {
  const store = createReduxStore(
    reducers,
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  )

  sagaMiddleware.run(rootSaga)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers)
    })
  }

  if (process.env.NODE_ENV === 'development') {
    window.store = store
  }

  return store
}

export default configureStore
