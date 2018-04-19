import React from 'react';
import { NavLink } from 'react-router-dom'

class Header extends React.Component {
  state = {
  }

  clearState = () => {
  };

  render() {
    return (

        
        <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><i className="fas fa-user"></i> User <span className="caret"></span></button>
            <ul className="dropdown-menu">
                <li><NavLink to="/login">Connexion</NavLink></li>
                <li><NavLink to="/signup">Inscription</NavLink></li>
                <li><NavLink to="/logout">Déconnexion</NavLink></li>
            </ul>
        </div>
    );
  }
}

export default Header;