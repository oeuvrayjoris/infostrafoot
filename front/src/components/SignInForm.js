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

    const myInit = { method: 'post',
                     headers: {
                       'Accept': 'application/json'
                    },
                    body: JSON.stringify(this.state)
                  };
    const url = 'https://www.floriantorres.fr/infostrafootapi/public/player'

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

    //this.loadPlayers()

    // Transmitting state to App.onSubmit function
    //this.clearState();
  };

  render() {
    return (

      <form>
      <div className="input-group">
        <input
          name="firstname"
          className="form-control"
          placeholder='Prénom'
          value={this.state.firstname}
          onChange={e => this.handleChange(e)}
        />
        </div>
        <div className="input-group">
        <input
          name="lastname"
          className="form-control"
          placeholder='Nom'
          value={this.state.lastname}
          onChange={e => this.handleChange(e)}
        />
        </div>
        <div className="input-group">
        <input
          name="username"
          className="form-control"
          placeholder='Pseudo'
          value={this.state.username}
          onChange={e => this.handleChange(e)}
        />
        </div>
        <div className="input-group">
        <input
          name="mail"
          className="form-control"
          placeholder='Email'
          value={this.state.mail}
          onChange={e => this.handleChange(e)}
        />
        </div>
        <div className="input-group">
        <input
          name="password"
          className="form-control"
          placeholder='Mot de passe'
          type="password"
          value={this.state.password}
          onChange={e => this.handleChange(e)}
        />
        </div>
        <div className="input-group">
        <input
          name="birthdate"
          className="form-control"
          placeholder='Date de naissance'
          value={this.state.birthdate}
          onChange={e => this.handleChange(e)}
        />
        </div>
        <button className="btn btn-primary" id="submit" onClick={e => this.onSubmit(e)}>S'inscrire</button>
        <a href="#" className="lien">Pas encore inscrit ?</a>
        </form>
    );
  }
}

export default SignInForm;