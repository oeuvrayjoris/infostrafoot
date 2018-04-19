import React from 'react';
import { NavLink } from 'react-router-dom'

class Header extends React.Component {
  state = {
  }

  clearState = () => {
  };

  render() {
    return (
        <div id="header">
            <NavLink to="/login">Connexion</NavLink>
            <NavLink to="/signup">Inscription</NavLink>
            <NavLink to="/logout">Déconnexion</NavLink>
        </div>
    );
  }
}

export default Header;