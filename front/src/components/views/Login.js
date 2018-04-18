import React, { Component } from 'react';
import logo from '../../img/logo.png';
import '../../styles/sass/style.scss';
import LoginForm from '../LoginForm.js';

class Login extends Component {

  state = {
    fields: {
    }
  }

  onSubmit = (fields) => {
    this.setState({ fields })
  };

  render() {
    return (

      <div className="row" id="connexion">
        <div className="col-md-4 flexbox">
          <img src={logo} className="logo" alt="logo" />
          <LoginForm onSubmit={fields => this.onSubmit(fields)} />
        </div>
        <div className="col-md-8" id="connexion-img">
        </div>        
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>
      </div>
    );
  }
}

export default Login;
