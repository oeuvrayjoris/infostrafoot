import React, { Component } from 'react';
import './styles/sass/style.scss';
import Login from './components/views/Login.js';
import SignUp from './components/views/SignUp.js';
import Home from './components/views/Home.js';

class App extends Component {

  render() {
    return (
        
        //<Home/>
        <Login/>
        //<SignUp/>
    );
  }
}

export default App;
