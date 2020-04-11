import React, { Component } from 'react'
import { AuthorizationUtils } from 'utils'

export default function withAuthorizationPermissions(WrappedComponent) {
  return class extends Component {

    UNSAFE_componentWillMount() {
      const token = AuthorizationUtils.getSessionToken()
      if (token) {
        AuthorizationUtils.redirectToHomePage()
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
}
