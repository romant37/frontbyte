import React, { useEffect, Suspense, lazy } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthorizationUtils } from 'utils'
import { AppLayout } from 'layouts'
import { Spinner } from 'components/common'
import { keepAlive } from 'modules/Auth/reducers/auth'

const Dashboard = lazy(() => import('modules/Dashboard/pages/Dashboard'))
const UsersList = lazy(() => import('modules/Users/pages/UsersList'))

const App = () => {

  const dispatch = useDispatch()

  // Keep token alive
  useEffect(() => {
    const keepAliveInterval = setInterval(() => dispatch(keepAlive()), 34000)
    return () => clearInterval(keepAliveInterval)
  })

  useEffect(() => {
    AuthorizationUtils.checkSessionToken()
  }, [])

  return (
    <AppLayout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/users' component={UsersList} />
          <Redirect path='*' to='/dashboard' />
        </Switch>
      </Suspense>
    </AppLayout>
  )
}

export default App
