import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from 'modules/Auth/reducers/auth'

const Dashboard = () => {
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(logout())
  }

  return (
    <div>
      Dashboard
      <p onClick={handleClick}>Logout</p>
    </div>
  )
}

export default Dashboard
