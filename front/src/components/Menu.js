import React from 'react';
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
                <span className="navbar-brand"><img src={logo} className="logo" alt="logo" /></span>
              </div>
              <div className="navbar-collapse collapse sidebar-navbar-collapse">
                <ul className="nav nav-pills nav-stacked">
                  <li className="active"><a href="/home"><i className="fas fa-home" /><br />Accueil</a></li>
                  <li><a href="/profile"><i className="fas fa-user" /><br />Profil</a></li>
                  <li><a href="/match"><i className="fas fa-plus-square" /><br />Créer un match</a></li>
                  <li><a href="/comparator"><i className="fas fa-users" /><br />Comparateur</a></li>
                  <li><a href="/search"><i className="fas fa-search" /><br />Rechercher</a></li>
                </ul>
              </div>
            </div>
          </div>
    );
  }
}

export default Menu;