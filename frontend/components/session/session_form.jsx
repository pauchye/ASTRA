import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(field) {
        return event => this.setState({
            [field]: event.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    render() {
        return (
            <div>
                <h3>
                    {this.props.formType}
                </h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Username:
                        <input type="text" 
                          value={this.state.username}
                          onChange={this.update('username')}
                        />
                    </label>
                    <label>Password:
                        <input type="password" 
                          value={this.state.password}
                          onChange={this.update('password')}
                        />
                    </label>
                    <button type="submit">{this.props.formType}</button>
                </form>
            </div>
        )
    }
  
   
  }

  export default SessionForm;