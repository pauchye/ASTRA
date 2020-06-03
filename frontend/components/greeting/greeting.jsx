import React from "react";
import { Link, useLocation } from 'react-router-dom'


export default ({currentUser, logout}) => {
  const currentRoute = useLocation().pathname;
  const showLogin = currentRoute !== '/login';
  const showSignup = currentRoute !== '/signup';
  console.log(currentUser);
 
  const display = currentUser ? (
    <div className ='header-greeting'>
        <div className='greeting-left'>
            <div className='greeting-logo-cont'>
                <Link to='/dashboard'><img src={window.astra} className='greeting-logo'/> </Link>
               
            </div>
            <div className='greeting-drop-cont'>
                <div >Hello {currentUser.first_name}!! </div>
                <div className='greeting-left-drop'>
                    Routes  
                </div>
                <div className='greeting-left-drop'>
                    Workouts
                </div> 
            </div>
            
        </div>
        <div className='greeting-right' >
            <div className='greeting-button' >
              <button onClick={logout}>Logout</button>   
            </div>  

        </div>
      
    </div>
  ) : (
    <div className ='header-greeting'>
        <div className='greeting-left'>
            <div className='greeting-logo-cont'>
                <Link to='/'><img src={window.astra} className='greeting-logo'/>  </Link>
               
            </div>
        
        </div>
        <div className='greeting-right'>
          { showLogin &&
            <div className='greeting-button' >
                <Link to="/login" className='greeting-link'>Log In</Link>
            </div>
          }
             { showSignup &&
            <div className='greeting-button' >
                <Link to="/signup" className='greeting-link'>Sign Up</Link> 
            </div> 
             }  
        </div>
    </div>
  )

  return (
    <div>
      {display}
    </div>
  )
}
