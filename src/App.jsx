import React, { useEffect, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthorizationUtils } from 'utils'
import { Spinner } from 'components/common'

const Dashboard = lazy(() => import('modules/Dashboard/pages/Dashboard'))

const App = () => {

  useEffect(() => {
    AuthorizationUtils.checkSessionToken()
  }, [])

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
        <Redirect path='*' to='/dashboard' />
      </Switch>
    </Suspense>
  )
}

export default App
