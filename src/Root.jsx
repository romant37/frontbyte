import React, { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { history } from 'utils'
import { LanguageLayout } from 'layouts'
import { Spinner } from 'components/common'
import { withAuthorizationPermissions } from 'modules/Auth/hocs'
import configureStore from './store'
import App from './App'
import './i18n'
import 'normalize.css'
import 'antd/dist/antd.css'

const store = configureStore()
const Login = lazy(() => import('modules/Auth/pages/Login'))

const Root = () => {
  return (
    <Provider store={store}>
      <LanguageLayout>
        <Router history={history}>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path='/login' component={withAuthorizationPermissions(Login)} />
              <Route path='/' component={App} />
            </Switch>
          </Suspense>
        </Router>
      </LanguageLayout>
    </Provider>
  )
}

export default Root
