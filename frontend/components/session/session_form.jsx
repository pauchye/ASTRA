import React from 'react';
import { Link } from 'react-router-dom'

class SessionForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        password: "",
        first_name: "",
        last_name: "",
        gender: "",
        email: ""
      };
      this.demoUser = {
        password: "123456",
        first_name: "Rick",
        last_name: "Deckard",
        gender: "", 
        email: "rick@deckard"
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.renderErrors = this.renderErrors.bind(this)
    }

    update(field) {
        return event => this.setState({
            [field]: event.target.value
        })
    }

    renderErrors() {
      
      return(
        <ul>
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }   

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);//change processForm for signup
    }

    render() {
        
        return (
            <div >
              {/* <header className ='header-signup'>
                <div>Astra</div>
                <div>
                <Link to={this.props.otherFormLink}>{this.props.otherFormType}</Link>
                </div>

              </header> */}
              <div className ='bkg-form-container'></div>
              <div className ='img-form-container'  >
                  <img src={window.runner} className='img-form'/>
              </div>
              <div className='black-form-container'>
              <div className='black-form'>
                <h3 className='form1'>
                    {this.props.formHeader}
                </h3>
                <form onSubmit={this.handleSubmit} className='form2'>
                    <label >
                        <input type="text" className='form-input'
                          value={this.state.email}
                          onChange={this.update('email')}
                          placeholder="Your Email"
                        />
                    </label>
                    <label>
                        <input type="password" className='form-input'
                          value={this.state.password}
                          onChange={this.update('password')}
                          placeholder="Your Password"
                        />
                    </label>
                    <button type="submit">{this.props.formType}</button>
                
                </form>
                <div className='form-error' >{this.renderErrors()}</div>
                {/* <ul>
                    {this.props.errors.map((error, i) => (
                      <li key={`error-${i}`}>
                        {error}
                      </li>
                    ))}
                 </ul> */}
                </div>
                
                </div>
            </div>
        )
    }
  
   
  }

  export default SessionForm;