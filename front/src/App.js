import React, { Component } from 'react';
import './styles/sass/style.scss';
import Login from './components/views/Login.js';
import SignUp from './components/views/SignUp.js';

class App extends Component {

  render() {
    return (
        
        // Afficher la vue correspondante en fonction de l'url
        <Login/>
        //<SignUp/>
    );
  }
}

export default App;
