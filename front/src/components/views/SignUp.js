import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../img/logo.png';
import '../../styles/sass/style.scss';
import Photo from '../../img/photo_example.gif'
import ApiService from '../ApiService'
import Footer from '../Footer.js';

/**
	 * SignUp page. Contains a form where player can register to be added to the data base
*/
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
        isPasswordOk: null,
        isUsernameOk: null,
        passwordConfirmation: null
      }
    }

    // Bindings this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ApiService = new ApiService();
  }

  /**
	 * Called immediatly before mounting occurs.
   * Replace '/' in history
	 */
  componentWillMount() {
    if (this.ApiService.loggedIn()) {
      this.props.history.replace('/')
    }
  }

  /**
	 * Check if username is in the correct format
   * 
   * @param username the username string of the form
	 */
  checkUsername(username) {
      setTimeout(() => {
          let result = /^(?=.{3,20}$)(?!.*[_.]{2})[a-zA-Z0-9._]/.test(username);
          const errors = this.state.errors
          errors.isUsernameOk = result
          this.setState({
             errors: errors
          })
      }, 800)
  }

  /**
	 * Check if password is in the correct format
   * 
   * @param password the password string of the form
	 */
  checkPassword(password) {
      setTimeout(() => {
          let result = /^(?=.{6,128}$)(?!.*[_.]{2})[a-zA-Z0-9._]/.test(password);
          const errors = this.state.errors
          errors.isPasswordOk = result
          this.setState({
             errors: errors
          })
      },800)
  }

  /**
	 * Handle the changed values on the form
   * 
   * @param event the event that happened
	 */
  handleChange = event => {
    const field = event.target.name;
    if (field === 'username')
      this.checkUsername(event.target.value)
    if (field === 'password')
      this.checkPassword(event.target.value)
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    this.setState({
      credentials: credentials
    });
  };

  /**
	 * Handle the submit event
   * 
   * @param event the event that happened
	 */
  handleSubmit(e){

    e.preventDefault();
    
    if (this.state.errors.isUsernameOk === true && this.state.errors.isPasswordOk === true) {
      this.ApiService.signup(this.state.credentials)
      .then(res => {
        console.log(res)
        this.props.history.replace('/login');
      })
      .catch(err => {
        console.log(err)
      })
    }
    
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
      <div className="row connexion" id="inscription">
        <div className="col-md-4 flexbox">
          <Link exact to="/" activeClassName="active"><img src={logo} className="logo" alt="logo" /></Link>
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
                onChange={e => this.handleChange(e)}
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
              placeholder='1999-12-25'
              value={this.state.credentials.birthdate}
              onChange={e => this.handleChange(e)}
            />
            </div>

            {
              this.state.errors.isUsernameOk === false && 
              <div className="input-group" id="result">
                  Le nom d'utilisateur doit contenir entre 6 et 20 caractères
              </div>
            }
            {
              this.state.errors.isPasswordOk === false && 
              <div className="input-group" id="result">
                 Votre mot de passe doit contenir entre 6 et 32 caractères
              </div>
            }

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
          {/*<Footer />*/}
        <div className="col-md-8" id="connexion-img">
        </div>
      </div>
    );
  }
}

export default SignUp;
