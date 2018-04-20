import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';
import Background from '../../img/novelli.jpg';
import AuthService from '../AuthService'
import withAuth from '../withAuth';
const Auth = new AuthService();


class Profile extends Component {

  render() {
    return (

      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <Header />
            <h1>Profil</h1>
            <hr />
            <div className="flexbox profil">
                <div className="photo">
                    <div style={{ backgroundImage: `url(${Background})` }}></div>
                </div>
                <h3>Jean-Christophe Novelli</h3>
                <h5>@Noveldu93</h5>
                <button className="btn btn-default">Modifier le profil</button>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="section flexbox" id="s1">Section 1</div>
              </div>
              <div className="col-md-9">
                <div className="section flexbox" id="s2">Section 2</div>
              </div>
            </div>
        </div>
        </div>
      </div>
    );
  }
};

export default Profile
//export default withAuth(Profile);
