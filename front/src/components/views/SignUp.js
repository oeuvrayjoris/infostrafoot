import React, { Component } from 'react';
import logo from '../../img/logo.png';
import '../../styles/sass/style.scss';
import Header from '../Header.js';
import Footer from '../Footer.js';
import SignUpForm from '../SignUpForm.js';

class SignUp extends Component {

  state = {
    fields: {}
  }

  onSubmit = (fields) => {
    this.setState({ fields })
  };

  render() {
    return (

      <div className="row" id="connexion">
        <div className="col-md-4 flexbox">
          <img src={logo} className="logo" alt="logo" />
          <SignUpForm onSubmit={fields => this.onSubmit(fields)} />
        </div>
        <div className="col-md-8" id="connexion-img">
        </div>

        <Header/>
        
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>
        <Footer/>
      </div>
    );
  }
}

export default SignUp;
