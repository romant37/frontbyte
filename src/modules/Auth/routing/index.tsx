import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { RouteChangeProgress } from 'components/progress'
import routes from './routes'

const LoginRoute = lazy(() => import('../pages/Login'))

const AuthRouting = () => {
  return (
    <Suspense fallback={<RouteChangeProgress />}>
      <Switch>
        <Route path={routes.login} component={LoginRoute} exact />
      </Switch>
    </Suspense>
  )
}

export default AuthRouting
