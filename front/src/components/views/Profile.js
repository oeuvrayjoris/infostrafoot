import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';
import Background from '../../img/novelli.jpg';
import AuthService from '../AuthService'
import withAuth from '../withAuth';
import ApiService from '../ApiService'
import Pie from '../Pie';

const Auth = new AuthService();
const Api = new ApiService();


class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      infos_player : {
        id: 1,
        mail: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        birthdate: ''
      },
      victory_stat : null,
      best_role : ""
    }
    this.setMyProfil = this.setMyProfil.bind(this)
  }

  getStats() {
    const profil = Api.getMyProfil()
    const stats = Api.getProfil(this.state.infos_player.id)

    return Promise.all([profil, stats])
  }
  
  componentDidMount() {
    this.setMyProfil(this.getStats())  // Calls API and then setState with the result
  }

  setMyProfil(result) {
    result.then(([profil, stats]) => {
      console.log(stats)
      console.log(profil)
      this.setState({
        infos_player : this.getProfilInfos(profil),
        victory_stat : this.getVictoryStat(stats),
        best_role : this.getBestRole(stats)
      })
    })
  }

  getProfilInfos(profil) {
    return (
      {
          id: profil.id,
          mail: profil.mail,
          username: profil.username,
          password: profil.password,
          firstname: profil.firstname,
          lastname: profil.lastname,
          birthdate: profil.birthdate
      }
    )
  }

  getVictoryStat(stats) {
    return (
      [
        {
            "id": "Victoires",
            "label": "Victoires",
            "value": stats.victories_count,
            "color": "#ff0000"
        },
        {
            "id": "Défaîtes",
            "label": "Défaîtes",
            "value": stats.defeats_count,
            "color": "#00ff00"
        }
      ]
    )
  }

  getBestRole(stats) {
    return (
      (stats.best_role === "striker")
        ? "Attaquant"
        : "Défenseur"
    )
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
                <h3>{this.state.infos_player.firstname} {this.state.infos_player.lastname}</h3>
                <h5>{this.state.infos_player.username}</h5>
                <button className="btn btn-default">Modifier le profil</button>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="section flexbox" id="s1">
                  Poste préféré : {this.state.best_role}
                </div>
              </div>
              <div className="col-md-9">
                <div className="section flexbox" id="s2">
                  {this.state.victory_stat
                    ? ( <Pie repositories={this.state.victory_stat} /> )
                    : ( <span></span> )
                  }
                </div>
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
