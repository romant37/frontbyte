import React, { ComponentType } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthorizationUtils } from 'utils'
import authRoutes from 'modules/Auth/routing/routes'

type PrivateRouteProps = {
  path?: string | string[]
  ProtectedComponent: ComponentType<any>
}

const PrivateRoute = ({ path, ProtectedComponent }: PrivateRouteProps) => {
  const canAccess = !!AuthorizationUtils.getSessionToken()

  return (
    <Route
      path={path}
      render={props =>
        canAccess ? (
          <ProtectedComponent {...props} />
        ) : (
          <Redirect
            to={{
              pathname: authRoutes.login,
              state: { target: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
