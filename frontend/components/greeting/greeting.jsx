import React from "react";
import { Link } from 'react-router-dom'

export default ({currentUser, logout}) => {
  const display = currentUser ? (
    <div>
      <p>Hello {currentUser.username}!! </p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  )

  return (
    <div>
      {display}
    </div>
  )
}
