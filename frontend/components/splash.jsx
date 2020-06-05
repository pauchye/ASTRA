import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
    constructor(props){
        super(props)
        this.demoUser = {
            password: "123456",
            first_name: "Rick",
            last_name: "Deckard",
            gender: "", 
            email: "rick@deckard"
          }
        this.loginDemo = this.loginDemo.bind(this)
    }

    loginDemo(e) {
      // debugger
        this.props.processForm(this.demoUser)
        // .then(() => this.props.history.push('/dashboard'))
    }

  render() {

    return(
      <div className ='main-splash'>
        {/* <header className ='header-splash'>
          <div>Astra</div>
          <div>
          <Link to='/login'>Log In</Link>
          <Link to='/signup'>Sign up</Link>
          </div>
        </header> */}
        <div className="main-body-splash">
          <h1 className ='title-splash'>The #1 app for runners and cyclists</h1>
          <div className ='body-splash'>
            <div className ='img-splash-container'  >
              <img src={window.splash} className='img-splash'/>
            </div>
                {/* <img src="assets/running-alone-front.jpg" /> */}
              <div>
                
                <div className ='button-splash-cont' >
                  <Link to='/signup' className ='button-splash' >Sign up with email</Link>
                  <div className='line-or'>
                    <div className ='text-or'>or</div>
                  </div>
                  <button className ='button-splash'className ='button-splash' onClick={this.loginDemo} >Demo User</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Splash;