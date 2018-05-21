import React from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../img/logo.png';

class Menu extends React.Component {
  state = {
  }

  clearState = () => {
  };

  render() {
    return (

        <div className="sidebar-nav height100">
            <div className="navbar navbar-default height100" role="navigation">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <span className="navbar-brand"><NavLink exact to="/" activeClassName="active" className="logo"><img src={logo} alt="logo" /></NavLink></span>
              </div>
              <div className="navbar-collapse collapse sidebar-navbar-collapse">
                <ul className="nav nav-pills nav-stacked">
                  <li><NavLink exact to="/" activeClassName="active"><i className="fas fa-home" /><br />Accueil</NavLink></li>
                  <li><NavLink to="/profile" activeClassName="active"><i className="fas fa-user" /><br />Profil</NavLink></li>
                  <li><NavLink to="/match" activeClassName="active"><i className="fas fa-plus-square" /><br />Créer un match</NavLink></li>
                  <li><NavLink to="/comparator" activeClassName="active"><i className="fas fa-users" /><br />Comparateur</NavLink></li>
                </ul>
              </div>
            </div>
          </div>
    );
  }
}

export default Menu;