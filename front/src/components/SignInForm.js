import React from 'react';

class SignInForm extends React.Component {
  state = {
      mail: '',
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      birthdate: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  clearState = () => {
    this.setState({
      mail: '',
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      birthdate: ''
    })
  };

  checkFields = () => {
    return true;
  };

// TEST GET - OK*/}

  loadPlayers = () => {
    const myInit = { method: 'get',
                    mode: 'no-cors'
                  };

    const url = 'https://www.floriantorres.fr/infostrafootapi/public/players'
    fetch(url)
      .then(function(response, myInit) {
        return response.json();
      })
      .then(function(datas) {
        console.log(datas)
      });    
  }

// TEST POST - PRESQUE OK*/}

  onSubmit = e => {
    e.preventDefault();
    (this.checkFields() && this.props.onSubmit(this.state));
    console.log(JSON.stringify(this.state))
    console.log(this.state)

    const testDatas = {
                        name: 'peter@klaven',
                        job: 'cityslicka'
                    }
    console.log(JSON.stringify(testDatas))

    const myInit = { method: 'post',
                     headers: {
                       'Accept': 'application/json'
                    },
                    body: JSON.stringify(testDatas)
                  };
//    const url = 'https://www.floriantorres.fr/infostrafootapi/public/player'
    const url = 'https://reqres.in/api/api/users/2'

    fetch(url, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(datas) {
        console.log(datas)
      })
      .catch((error) => {
        console.error(error)
      });

    this.loadPlayers()

    // Transmitting state to App.onSubmit function
    //this.clearState();
  };

  render() {
    return (
      <div>
        <input
          name="mail"
          placeholder='Email'
          value={this.state.mail}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <input
          name="username"
          placeholder='Username'
          value={this.state.username}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <input
          name="password"
          placeholder='Password'
          type="password"
          value={this.state.password}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <input
          name="firstname"
          placeholder='First name'
          value={this.state.firstname}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <input
          name="lastname"
          placeholder='Last Name'
          value={this.state.lastname}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <input
          name="birthdate"
          placeholder='Birthdate'
          value={this.state.birthdate}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Sign in</button>
        </div>
    );
  }
}

export default SignInForm;