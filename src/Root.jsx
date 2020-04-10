import React, { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { history } from 'utils'
import { Spinner } from 'components/common'
import { withAuthorizationPermissions } from 'modules/Auth/hocs'
import configureStore from './store'
import App from './App'
import 'normalize.css'
import 'antd/dist/antd.css'

const store = configureStore()
const Login = lazy(() => import('modules/Auth/pages/Login'))

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path='/login' component={withAuthorizationPermissions(Login)} />
            <Route path='/' component={App} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default Root
