import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from 'store'
import AuthRouting from 'modules/Auth/routing'
import routes from './routes'

const RootRouting = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={routes.root} component={AuthRouting} />
      </Switch>
    </ConnectedRouter>
  )
}

export default RootRouting
