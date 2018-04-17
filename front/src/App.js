import React, { Component } from 'react';
import logo from './img/logo.png';
import './App.scss';
import Header from './components/Header.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import SignInForm from './components/SignInForm.js';
// import LoginForm from './components/LoginForm.js';

class App extends Component {

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
          <SignInForm onSubmit={fields => this.onSubmit(fields)} />
        </div>
        <div className="col-md-8" id="connexion-img">
        </div>

        <Header/>
        <Menu/>
        
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>
        <Footer/>
      </div>
    );
  }
}

export default App;
