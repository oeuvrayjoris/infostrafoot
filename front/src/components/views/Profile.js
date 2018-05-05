import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';
import Background from '../../img/novelli.jpg';
import AuthService from '../AuthService'
import withAuth from '../withAuth';
import ApiService from '../ApiService'
const Auth = new AuthService();
const Api = new ApiService();


class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mail: '',
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      birthdate: ''
    }
    this.setMyProfil = this.setMyProfil.bind(this)
    
    Api.getMyProfil().then(result => this.setMyProfil(result))  // Calls API and then setState with the result
  }

  setMyProfil(result) {
    this.setState({
      mail: result.mail,
      username: result.username,
      password: result.password,
      firstname: result.firstname,
      lastname: result.lastname,
      birthdate: result.birthdate
    })
  }

  render() {
    Auth.login({
      username: 'babou97',
      password: 'babou97'
    })
        
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
                <h3>{this.state.firstname} {this.state.lastname}</h3>
                <h5>{this.state.username}</h5>
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
