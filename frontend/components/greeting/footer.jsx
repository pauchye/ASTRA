import React from "react";
import { Link, useLocation } from 'react-router-dom'


export default ({currentUser, logout}) => {
  const currentRoute = useLocation().pathname;
  const showLogin = currentRoute !== '/login';
  const showSignup = currentRoute !== '/signup';
  const noNewRoute = currentRoute !== '/routes/new'
 
  const display = showLogin && showSignup && noNewRoute ? (
    <div className ='footer-greeting'>
        <div className='greeting-left'>
            <div className='greeting-logo-cont'>
                <Link to='/dashboard'><img src={window.astra_gray} className='greeting-logo'/> </Link>     
            </div>          
        </div>
        <div className='greeting-right'>
        <a className="fab fa-github fa-lg quick-fix" href="https://github.com/pauchye"></a>
        <a className="fab fa-linkedin fa-lg quick-fix" href="https://www.linkedin.com/in/olga-smirnova-17b73b41/"></a>
        </div>
      
    </div>
  ) : (
    <div>
        
    </div>
  )

  return (
    <div>
      {display}
    </div>
  )
}
