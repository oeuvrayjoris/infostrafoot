import React, { Component } from 'react';
import logo from '../../img/logo.png';
import '../../styles/sass/style.scss';
import LoginForm from '../LoginForm.js';
import AuthService from '../AuthService'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        credentials: {
          username: '',
          password: '',
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
    this.Auth.login(this.state.credentials)
      .then(res => {
        console.log(res)
        console.log(this.Auth.getToken())
        this.props.handleUser()
      })
      .then(res =>{
         this.props.history.replace('/');
      })
      .catch(err =>{
          alert(err);
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
  
  render() {
    return (

      <div className="row" id="connexion">
        <div className="col-md-4 flexbox">
          <a href="/"><img src={logo} className="logo" alt="logo" /></a>
          <LoginForm credentials={this.state.credentials} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        </div>
        <div className="col-md-8" id="connexion-img">
        </div>
      </div>
    );
  }
}

export default Login;
