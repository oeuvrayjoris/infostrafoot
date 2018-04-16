import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Button } from 'react-bootstrap';
import Header from './components/Header.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import SignInForm from './components/SignInForm.js';

class App extends Component {

  state = {
    fields: {}
  }

  onSubmit = (fields) => {
    this.setState({ fields })
  };

  render() {
    return (
      <div className="App">
        <Header/>
        <Menu/>
        <SignInForm onSubmit={fields => this.onSubmit(fields)} />
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>
        <Footer/>
      </div>
    );
  }
}

export default App;
