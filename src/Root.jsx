import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { history } from 'utils'
import LoginPage from 'modules/Auth/pages/Login'

const Root = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Redirect path='*' to='/login' />
      </Switch>
    </Router>
  )
}

export default Root
