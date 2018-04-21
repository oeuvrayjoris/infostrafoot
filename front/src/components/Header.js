import React from 'react';
import { NavLink } from 'react-router-dom'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
        <div>
          {!this.props.user ? 
            (<div id="header">
              <NavLink to="/login">Connexion</NavLink>
                <NavLink to="/signup">Inscription</NavLink>
            </div>
            ) :
            (<div id="header">
                Bonjour, vous est bien connecté !
              <NavLink to="/" onClick={this.props.handleLogout}>Déconnexion</NavLink>
            </div>
            )
          }
        </div>
    );
  }
}

export default Header