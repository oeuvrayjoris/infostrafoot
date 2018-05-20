// Import libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
// Import components
import ApiService from '../ApiService'
import Footer from '../Footer.js';
import withAuth from '../withAuth.js'
// Import files
import logo from '../../img/logo.png';
import '../../styles/sass/style.scss';

/**
	 * Login page. Contains a form where player can register to be logged-in with his account
*/
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        credentials: {
          username: '',
          password: '',
        },
        errors: {
          isFieldMissing: false,
          isUserNotFound: false
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
	 * Handle the changed values on the form
   * 
   * @param event the event that happened
	 */
  handleChange = e => {
    const field = e.target.name;
    const credentials = this.state.credentials;
    credentials[field] = e.target.value;
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

    const newErrors = this.state.errors
    newErrors.isUserNotFound = false
    newErrors.isFieldMissing = false
    
    this.ApiService.login(this.state.credentials)
      .then(res =>{
        console.log(res)
         this.props.history.replace('/');
      })
      .catch(err =>{
        console.log(err)
        err.then(response => {
          console.log(response)
          if (response.password || response.username)
            newErrors.isFieldMissing = true
          else if (response[0] !== undefined && response[0] === 'user_not_found')
            newErrors.isUserNotFound = true
          this.setState({
            errors: newErrors
          });
        })
      })

    this.setState({
      errors: newErrors
    });


    /*
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    const options = {
        method : 'POST',
        body: JSON.stringify(this.state.credentials)
      }

    const url = 'https://www.floriantorres.fr/infostrafootapi/public/auth/login'

    fetch(url, {headers, ...options})
    .then(response => response)
    .then(response => {
      console.log(response.json())
    })

    this.Auth.login(this.state.credentials)
      .then(res =>{
        console.log(res)
         //this.props.history.replace('/');
      })
      .catch(err =>{
          alert(err);
      })
      */
  }
  
  render() {
    return (

      <div className="row connexion">
        <div className="col-md-4 flexbox">
        <Link exact to="/" activeClassName="active"><img src={logo} className="logo" alt="logo" /></Link>
          <form>
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon1"><i className="fas fa-user"></i></span>
                <input
                  name="username"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  placeholder='Pseudo'
                  value={this.state.credentials.username}
                  onChange={e => this.handleChange(e)}
                />
            </div>

            <div className="input-group">
                <span className="input-group-addon" id="basic-addon2"><i className="fas fa-key"></i></span>
                <input
                  name="password"
                  className="form-control"
                  aria-describedby="basic-addon2"
                  placeholder='Mot de passe'
                  type="password"
                  value={this.state.credentials.password}
                  onChange={e => this.handleChange(e)}
                />
            </div>

            <div className="input-group right">
              <input
                className="btn btn-primary" 
                id="submit" 
                onClick={e => this.handleSubmit(e)}
                value="Connexion"
                type="submit"
              />
            </div>
            {this.state.errors.isFieldMissing === true && <div className="error"><p>Veuillez remplir tous les champs</p></div>}
            {this.state.errors.isUserNotFound === true && <div className="error"><p>Utilisateur inconnu ou erreur dans le mot de passe</p></div>}

            <Link to="/signup" className="lien">Pas encore inscrit ?</Link>
          </form>
          {/*<Footer />*/}
        </div>
        <div className="col-md-8" id="connexion-img">
        </div>
      </div>
    );
  }
}


export default Login;
//export default withAuth(Login);