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
  }

  handleLogout() {
    this.props.handleLogout()
  }

  render() {
    return (
        <div>
          {this.state.userAuthenticated === false ? 
            (<div id="header">
                <NavLink to="/login">Connexion</NavLink>
                <NavLink to="/signup">Inscription</NavLink>
            </div>
            ) :
            (<div id="header">
                Bonjour, vous êtes bien connecté ! &nbsp;
                {/*<a href="#" onClick={this.handleLogout.bind(this)}>Déconnexion</a>*/}
                <NavLink to="/login" onClick={this.handleLogout.bind(this)}>Déconnexion</NavLink>
            </div>
            )
          }
        </div>
    );
  }
}

export default Header