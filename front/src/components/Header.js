import React from 'react';
import { NavLink, Redirect  } from 'react-router-dom'
import ApiService from './ApiService'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userAuthenticated: false
    }

    this.ApiService = new ApiService()
  }

  componentWillMount() {
    if (this.ApiService.loggedIn()) {
      this.setState({...this.state, userAuthenticated: true})
    }
    else {
      this.setState({...this.state, userAuthenticated: false})
    }
  }

  handleLogout() {
    this.props.handleLogout()
    this.props.history.replace('/')
  }

  render() {
    console.log(this.state.userAuthenticated)
    return (
        <div>
          {this.state.userAuthenticated === false ? 
            (<div id="header">
              <NavLink to="/login">Connexion</NavLink>
                <NavLink to="/signup">Inscription</NavLink>
            </div>
            ) :
            (<div id="header">
                Bonjour, vous est bien connecté ! &nbsp;
              <a href="#" onClick={this.handleLogout.bind(this)}>Déconnexion</a>
            </div>
            )
          }
        </div>
    );
  }
}

export default Header