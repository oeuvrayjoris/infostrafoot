import React, { Component } from 'react';
import logo from '../../img/logo.png';
import '../../styles/sass/style.scss';
import Photo from '../../img/photo_example.gif'
import ApiService from '../ApiService'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        mail: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        birthdate: ''
      },
      errors: {
        isPasswordOk: false,
        isUsernameOk: false,
        passwordConfirmation: false
      }
    }

    // Bindings this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ApiService = new ApiService();
  }

  checkPseudo(username) {
      setTimeout(() => {
          let result = /^(?=.{3,20}$)(?!.*[_.]{2})[a-zA-Z0-9._]/.test(username);
          const errors = this.state.errors
          errors.isUsernameOk = result
          this.setState({
             errors: errors
          })
      }, 800)
  }

  checkPassword(password) {
      setTimeout(() => {
          let result = /^(?=.{3,128}$)(?!.*[_.]{2})[a-zA-Z0-9._]/.test(password);
          const errors = this.state.errors
          errors.isPasswordOk = result
          this.setState({
             errors: errors
          })
      },800)
  }

  // Handle the changed values on the form
  handleChange = event => {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    this.setState({
      credentials: credentials
    });
  };

  // Handle the submit event
  handleSubmit(e){

    e.preventDefault();
    
    this.ApiService.signup(this.state.credentials)
    .then(res => {
      console.log(res)
      this.props.history.replace('/');
    })
    .catch(err => {
      console.log(err)
    })
    
    /*
    const options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method : 'POST',
        body: JSON.stringify(this.state.credentials)

    }
    const url = 'https://www.floriantorres.fr/infostrafootapi/public/player'
    fetch(url, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))

    this.Auth.signup(this.state.credentials)
      .then(res => {
        console.log(res)
      })
      .then(res =>{
        this.props.history.replace('/');
      })
      .catch(err =>{
        console.log(err)
        alert(err);
          // Afficher ce qui va pas quand ca sera géré en back
      })*/
  }

  render() {
    return (
      <div className="row" className="connexion" id="inscription">
        <div className="col-md-4 flexbox">
          <a href="/" className="logo"><img src={logo} alt="logo" /></a>
          <form>
            <div className="input-group" id="photoInput">
            <label htmlFor="file">
                <div className="photo">
                    <div className="flexbox" style={{ backgroundImage: `url(${Photo})` }}>
                        <span><i className="fas fa-camera"></i></span>  
                    </div>
                </div>
            </label>
            <input
                id="file"
                type="file"
                name="photo"
                className="input-file"
                onChange={e => this.handleChange(e.target.files)}
            />
            </div>
          <div className="input-group">
            <input
              name="firstname"
              className="form-control"
              placeholder='Prénom'
              value={this.state.credentials.firstname}
              onChange={e => this.handleChange(e)}
            />
            </div>
            <div className="input-group">
            <input
              name="lastname"
              className="form-control"
              placeholder='Nom'
              value={this.state.credentials.lastname}
              onChange={e => this.handleChange(e)}
            />
            </div>
            <div className="input-group">
            <input
              name="username"
              className="form-control"
              placeholder='Pseudo'
              value={this.state.credentials.username}
              onChange={e => this.handleChange(e)}
            />
            </div>
            <div className="input-group">
            <input
              name="mail"
              className="form-control"
              placeholder='Email'
              value={this.state.credentials.mail}
              onChange={e => this.handleChange(e)}
            />
            </div>
            <div className="input-group">
            <input
              name="password"
              className="form-control"
              placeholder='Mot de passe'
              type="password"
              value={this.state.credentials.password}
              onChange={e => this.handleChange(e)}
            />
            </div>
            <div className="input-group">
            <input
              name="birthdate"
              className="form-control"
              placeholder='Date de naissance'
              value={this.state.credentials.birthdate}
              onChange={e => this.handleChange(e)}
            />
            </div>
            <div className="input-group" id="result">
                Error! ou Success! message here.
            </div>
            <div className="input-group">
              <input
                className="btn btn-primary" 
                id="submit" 
                onClick={e => this.handleSubmit(e)}
                value="S'inscrire"
                type="submit"
              />
            </div>
            </form>
        </div>
        <div className="col-md-8" id="connexion-img">
        </div>
      </div>
    );
  }
}

export default SignUp;
