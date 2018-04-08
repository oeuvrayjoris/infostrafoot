import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Button } from 'react-bootstrap';
import Form from './Form.js';

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
        <Form onSubmit={fields => this.onSubmit(fields)} />
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>
      </div>
    );
  }
}

export default App;
