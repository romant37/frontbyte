/* eslint no-underscore-dangle: "off" */
import {
  applyMiddleware,
  compose,
  createStore as createReduxStore,
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import payloadMiddleware from 'middlewares/payloadMiddleware'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware, payloadMiddleware]

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  if (
    typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
  ) {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
}

const configureStore = () => {
  const store = createReduxStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  )

  sagaMiddleware.run(rootSaga)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(rootReducer)
    })
  }

  if (process.env.NODE_ENV === 'development') {
    ;(window as any).store = store
  }

  return store
}

export type RootState = ReturnType<typeof rootReducer>

export default configureStore
