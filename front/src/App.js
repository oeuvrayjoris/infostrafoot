import React, { Component } from 'react';
import logo from './img/logo.png';
import './styles/sass/style.scss';
import Login from './components/views/Login.js';
import SignUp from './components/views/SignUp.js';

class App extends Component {

  render() {
    return (
      <SignUp/>
    );
  }
}

export default App;
