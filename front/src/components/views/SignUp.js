import React, { Component } from 'react';
import logo from '../../img/logo.png';
import '../../styles/sass/style.scss';
import SignUpForm from '../SignUpForm.js';
import AuthService from '../AuthService'

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
      errors: {}
    }

    // Bindings this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();

  }

  // TODO - Verifier la validité des champs
  checkFields = () => {
    return true;
  };
  
  // Checks before if are logged in we render the DOM 
  componentWillMount(){
    if(this.Auth.loggedIn())
        this.props.history.replace('/');
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
    this.Auth.signup(this.state.credentials)
      .then(res => {
        console.log(res)
        console.log(this.Auth.getToken())
        this.loadPlayers()
      })
      .then(res =>{
         this.props.history.replace('/');
      })
      .catch(err =>{
          alert(err);
          // Afficher ce qui va pas quand ca sera géré en back
      })
  }

  clearState = () => {
    this.setState({
      credentials : {
        username: '',
        password: ''
      }
    })
  };

  // Check the GET method on the API
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
      })
      .catch(function(error) {
          this.setState({error})
          console.log(error)
      });
  }

  render() {
    return (

      <div className="row" id="connexion">
        <div className="col-md-4 flexbox">
          <img src={logo} className="logo" alt="logo" />
          <SignUpForm credentials={this.state.credentials} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        </div>
        <div className="col-md-8" id="connexion-img">
        </div>
      </div>
    );
  }
}

export default SignUp;
