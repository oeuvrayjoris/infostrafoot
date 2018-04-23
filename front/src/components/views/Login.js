import React, { Component } from 'react';
import logo from '../../img/logo.png';
import '../../styles/sass/style.scss';
import AuthService from '../AuthService'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        credentials: {
          username: '',
          password: '',
        },
        errors: {
          isUsernameOk: false,
          isPasswordOk: false
        }
    }

    // Bindings this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();

  }

  /*
  // Checks before if are logged in we render the DOM 
  componentWillMount(){
      if(this.Auth.loggedIn())
          this.props.history.replace('/');
  }
  */

  // Handle the changed values on the form
  handleChange = e => {
    const field = e.target.name;
    const credentials = this.state.credentials;
    credentials[field] = e.target.value;
    this.setState({
      credentials: credentials
    });
  };

  // Handle the submit event
  handleSubmit(e){
    e.preventDefault();
    
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    const options = {
        method : 'POST',
        body: JSON.stringify(this.state.credentials)
      }

      console.log({headers, ...options})
      console.log({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        method : 'POST',
        body: JSON.stringify(this.state.credentials)
      })

    const url = 'https://www.floriantorres.fr/infostrafootapi/public/auth/login'

    fetch(url, {headers, ...options})
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))

/*
    this.Auth.login(this.state.credentials)
      .then(res =>{
        console.log(res)
         //this.props.history.replace('/');
      })
      .catch(err =>{
          alert(err);
      })*/
    
  }
  
  render() {
    return (

      <div className="row" className="connexion">
        <div className="col-md-4 flexbox">
          <a href="/"><img src={logo} className="logo" alt="logo" /></a>
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
            <Link to="/signup" className="lien">Pas encore inscrit ?</Link>
          </form>
        </div>
        <div className="col-md-8" id="connexion-img">
        </div>
      </div>
    );
  }
}

export default Login;
