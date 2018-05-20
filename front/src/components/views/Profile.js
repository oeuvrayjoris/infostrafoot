import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Background from '../../img/novelli.jpg';
import withAuth from '../withAuth';
import ApiService from '../ApiService'
import Pie from '../Pie';
import Line from '../Line';

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
      best_role : null,
      match_stat : null,
      playtime : null
    }
    this.setMyProfil = this.setMyProfil.bind(this)
    this.ApiService = new ApiService();
  }

  handleLogout() {
    this.ApiService.logout()
  }

  getStats() {
    const profil = this.ApiService.getMyProfil()
    const stats = this.ApiService.getProfil(this.state.infos_player.id)

    return Promise.all([profil, stats])
  }

  componentWillMount() {
    if (this.ApiService.loggedIn() === true) {
      const profil = this.ApiService.getMyProfil()
      const newInfos = this.state.infos_player
      newInfos.id = profil.id
      //newInfos.id = 1
      this.setState({infos_player: newInfos})
    }
  }

  componentDidMount() {
    if (this.ApiService.loggedIn() === true) {
      this.setMyProfil(this.getStats())  // Calls API and then setState with the result
    }      
  }

  setMyProfil(result) {
    result.then(([profil, stats]) => {
      console.log(stats)
      console.log(profil)
      this.setState({
        infos_player : this.getProfilInfos(profil),
        victory_stat : (stats) ? this.getVictoryStats(stats) : null,
        best_role : (stats) ? this.getBestRole(stats) : null,
        match_stat : (stats) ? this.getGoals(stats) : null,
        playtime : (stats) ? this.getPlayTime(stats) : null
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
        },
        {
            "id": "Défaîtes",
            "label": "Défaîtes",
            "value": stats.defeats_count,
        }
      ]
    )
  }

  getRatio() {
    const victories = this.state.victory_stat[0].value
    const defeats = this.state.victory_stat[1].value
    
    return Math.floor(victories/(victories+defeats)*100) + " %"
  }

  getBestRole(stats) {
    return (
      (stats.best_role === "striker")
        ? "Attaquant"
        : "Défenseur"
    )
  }

  getGoals(stats) {
    // On récupére le dernier match joué, ses goals et ses équipes
    const match = stats.last_match
    const goals = match.goals
    const teams = match.teams
    // On récupére l'index de notre équipe (0 ou 1)
    const myTeamIndex = this.knowMyTeam(teams)
    // On récupére la date de création du match pour l'utiliser comme temps référence
    const baseTime = this.getTime(match)
    // On récupére un tableau des buts marqués (quelle équipe, quel numéro de buts, quel type)
    const goalIndexes = goals.map((goal, index) => (
      {"team_num":this.getGoalTeam(goal, teams),"index":index,"gamelle":goal.gamelle,"own_goal":goal.own_goal}
    ))
    // On récupére un tableau contenant le temps de chaque but
    const goalTime = goals.map(goal => this.getGoalTime(goal, baseTime)).map(time => this.timeToString(time))
    // On récupére l'historique de l'évolution des scores des deux équipes
    const scores = this.getScores(goalIndexes)

    // On formate les données pour Nivo, le temps en abscisse, le score de l'équipe en ordonnée
    // On utilise reduce pour supprimer les clés dupliquées (2 buts dans la même seconde), sinon probleme
    const dataTeam1 = goalTime.map((time, index) => ({
        "x":time,
        "y":scores[index].score_1
      })).reduce((x, y) => x.findIndex(e=>e.x===y.x)<0 ? [...x, y]: x, [])

    const dataTeam2 = goalTime.map((time, index) => ({
        "x":time,
        "y":scores[index].score_2
      })).reduce((x, y) => x.findIndex(e=>e.x===y.x)<0 ? [...x, y]: x, [])

    // On rajoute une donnée pour marquer le début du match
    const firstObj = {"x":"00:00","y":0}
    dataTeam1.unshift(firstObj)
    dataTeam2.unshift(firstObj)

    const datas = [
      {
        "id" : "Mon équipe",
        "data" : dataTeam1
      },
      {
        "id" : "Equipe adverse",
        "data" : dataTeam2
      }
    ]
    return datas
  }

  // Renvoie l'index de la team dans teams
  knowMyTeam(teams) {
    // J'utilise le if else car le ternaire ne fonctionne pas ici, je ne sais pas pourquoi
    if (teams[0].players[0].id === this.state.infos_player.id || teams[0].players[1].id === this.state.infos_player.id)
      return 0
    else return 1
  }

  // Pour savoir le goal appartient à quelle équipe
  getGoalTeam(goal, matchTeams) {
    // Pareil ici le ternaire ne fonctionne pas, je ne sais pas pourquoi
    if (matchTeams[0].players[0].id === goal.player_id || matchTeams[0].players[1].id === goal.player_id)
    return 0
    else return 1
  }

  // Pour connaitre l'horraire du début du match qui sera la référence
  getTime(object) {
    const time = object.created_at.substr(11).split(":", 3);
    const hour = time[0]
    const minutes = time[1]
    const seconds = time[2]

    return {"hour":hour,"minutes":minutes,"seconds":seconds}
  }

  // Pour connaitre le temps du but dans le match
  getGoalTime(goal, baseTime) {
    const goalTime = this.getTime(goal)
    const _hour = goalTime.hour - baseTime.hour
    const _minutes = goalTime.minutes - baseTime.minutes
    const _seconds = goalTime.seconds - baseTime.seconds

    const hour = (_hour < 0) ? _hour+24 : _hour
    const minutes = (_minutes < 0) ? _minutes+60 : _minutes
    const seconds = (_seconds < 0) ? _seconds+60 : _seconds

    return {"hour":hour,"minutes":minutes,"seconds":seconds}
  }

  // Transform time object to string
  timeToString(time) {
    const hour = (time.hour < 10) ? "0"+time.hour : time.hour
    const minutes = (time.minutes < 10) ? "0"+time.minutes : time.minutes
    const seconds = (time.seconds < 10) ? "0"+time.seconds : time.seconds
    return minutes+":"+seconds
    //return hour+":"+minutes+":"+seconds
  }

  // Renvoie un tableau contenant l'historique des scores
  getScores(goals) {
    let score_1 = 0
    let score_2 = 0
    const scores = goals.map(goal => ( 
      (goal.team_num === 0)
      ? (goal.own_goal)
        ? score_2++
        : (goal.gamelle)
          ? (score_2 === 0)
            ? score_1++
            : score_2--
          : score_1++
      : (goal.own_goal)
        ? score_1++
        : (goal.gamelle)
          ? (score_1 === 0)
            ? score_2++
            : score_1--
          : score_2++,
    {
      "score_1" : score_1,
      "score_2" : score_2
    }))
    return scores
  }

  getPlayTime(stats) {
    const time = this.getTime(stats.played_time)
    console.log(stats)
    return (time.hour > 0)
      ? time.hour + " h " + time.minutes + " m " + time.seconds + " s"
      : (time.minutes > 0)
        ? time.minutes + " m " + time.seconds + " s"
        : time.seconds + " s"
  }
  

  render() {
    /*Auth.login({
      username: 'babou97',
      password: 'babou97'
    })*/

    return (
      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <Header handleLogout={this.handleLogout.bind(this)}/>
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
                  Poste préféré :  {this.state.best_role ? this.state.best_role : <span>aucun</span>}
                </div>
              </div>
              <div className="col-md-9">
                <div className="section flexbox" id="s2">
                  <div className="flexbox flex-column">
                    {this.state.victory_stat  // NEED TO FIX CSS HERE
                      ? <h1>{this.getRatio()} de victoires</h1>
                      : ( <span></span> )
                    }
                  </div>
                  {this.state.victory_stat
                      ? <Pie repositories={this.state.victory_stat}/>
                      : ( <span>Faîtes des matchs pour voir vos statistiques</span> )
                  }
              </div>
            </div>
          </div>
          <br />
          <div className="row">
              <div className="col-md-3">
                <div className="section flexbox" id="s1">
                  <div className="flexbox flex-column">
                    Vous avez joué : {(this.state.playtime) ? this.state.playtime : "0 seconde"}
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="section flexbox" id="s2">
                  {this.state.match_stat
                      ? <Line repositories={this.state.match_stat}/>
                      : ( <span>Vous n'avez pas encore fait de match</span> )
                  }
              </div>
            </div>
          </div>
          <Footer />
        </div>
        </div>
      </div>
    );
  }
};

//export default Profile
export default withAuth(Profile);
