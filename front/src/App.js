import React, { Component } from 'react';
import logo from './img/logo.png';
import './App.scss';
import Login from './components/views/Login.js';
import SignUp from './components/views/SignUp.js';
// import LoginForm from './components/LoginForm.js';

class App extends Component {

  render() {
    return (
      <SignUp/>
    );
  }
}

export default App;
