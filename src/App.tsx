import React, { useEffect, Suspense, lazy, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthorizationUtils } from 'utils'
import { AppLayout } from 'layouts'
import { AppLayoutSegmentProps } from 'layouts/layout.contract'
import { Spinner } from 'components/common'
import { keepAlive } from 'modules/Auth/reducers/auth'
import { getDictionaries } from 'modules/common/reducers/dicts'

const Dashboard = lazy(() => import('modules/Dashboard/pages/Dashboard'))
const UsersList = lazy(() => import('modules/Users/pages/UsersList'))
const UserDetails = lazy(() => import('modules/Users/pages/UserDetails'))
const Test = lazy(() => import('modules/Test'))

const App = () => {
  const dispatch = useDispatch()

  // Keep token alive
  useEffect(() => {
    const keepAliveInterval = setInterval(() => dispatch(keepAlive()), 30000)
    return () => clearInterval(keepAliveInterval)
  }, [dispatch])

  useEffect(() => {
    const token = AuthorizationUtils.getSessionToken()
    if (token) {
      // Prepare required data
      dispatch(getDictionaries())
    } else {
      AuthorizationUtils.redirectToLoginForm()
    }
  }, [dispatch])

  const Content: FC<AppLayoutSegmentProps> = () => (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/users/:id' component={UserDetails} />
        <Route exact path='/users' component={UsersList} />
        <Route exact path='/test' component={Test} />
        <Redirect path='*' to='/dashboard' />
      </Switch>
    </Suspense>
  )

  return (
    <AppLayout>
      <Content segmentId='content' />
    </AppLayout>
  )
}

export default App
