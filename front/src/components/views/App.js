// Importing Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// Importing Styles
import '../../styles/sass/style.scss';
// Importing Components
import Menu from '../Menu.js';
import Header from '../Header.js';
import AuthService from '../AuthService';
import ApiService from '../ApiService'
import Background from '../../img/novelli.jpg';
import Pie from '../Pie';

const Auth = new AuthService();
const Api = new ApiService();

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: null,
      best_scorer : null,
      best_team : null,
      goals_stat : null,
      team_stat : null
    }
  }

  handleLogout(){
    Auth.logout()
    //this.props.history.replace('/');
    this.setState({
      user: null
    }, console.log("Disconnected"))
    this.checkIfUserAuth()
  }

  getStats() {
    const home = Api.home()
    const goals = Api.getGoals()

    return Promise.all([home, goals])
  }

  componentDidMount() {
    this.setStats(this.getStats())
  }

  setStats(results) {
    results.then(([home, goals]) => {
      // Home
      const best_team = {
        id:home.best_teams[0].id,
        player_1:home.best_teams[0].players[0].username,
        player_2:home.best_teams[0].players[1].username
      }

      // Goals
      const gamelles = goals.filter(goal => (goal.gamelle === 1))
      const own_goal = goals.filter(goal => (goal.own_goal === 1))
      const goal = goals.length - gamelles.length - own_goal.length

      this.setState({
        best_scorer: home.best_scorers[0].username,
        best_team: best_team,
        goals_stat : this.getGoalsStat(gamelles.length, own_goal.length, goal)
      })

      this.setTeamMatchStat(best_team.id)
    })
  }

  getGoalsStat(gamelles, own_goal, goal) {
    return (
      [
        {
            "id": "Goal",
            "label": "Goal",
            "value": goal,
            "color": "#ff0000"
        },
        {
            "id": "Gamelles",
            "label": "Gamelles",
            "value": gamelles,
            "color": "#00ff00"
        },
        {
            "id": "Contre Son Camp",
            "label": "Contre Son Camp",
            "value": own_goal,
            "color": "#ff00ff"
        }
      ]
    )
  }

  setTeamMatchStat(team_id) {
    Api.getTeam(team_id)
      .then(result => {
        this.setState({
          team_stat: this.getTeamMatchStat(result)
        })
      })
  }
  getTeamMatchStat(team_stat) {
    this.getLastMatches(team_stat.matches)
    return (team_stat.id)
  }
  getLastMatches(matches) {
      const today = this.formatDate();
      console.log(today)
      matches.map(match => {
        this.compareDate(today, this.getDayMonthYear(match.end_time))
      })
      /*
      const dd = today.getDate();
      const mm = today.getMonth()+1; //January is 0!
      const yyyy = today.getFullYear();
      const day = today.getDay()
      */
  }

  formatDate() {
    let d = new Date(),
    month = d.getMonth() + 1,
    day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate(),
    year = d.getFullYear(),
    hours = d.getHours(),
    minutes = d.getMinutes(),
    seconds = (d.getSeconds() < 10) ? "0" + d.getSeconds() : d.getSeconds();

    //const today = year +  "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds

    return {year:year, month:month, day:day, dayName:d.getDay()}
  }

  getDayMonthYear(date) {
    // Date must be in formatDate() : year +  "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds

    const splitted = date.substr(0,10).split("-", 3);
    return ({
      year:parseInt(splitted[0]),
      month:parseInt(splitted[1]),
      day:parseInt(splitted[2])
    })
  }

  compareDate(today, date) {
    (today.year === date.year)
      ? console.log("OK")
      : console.log("NOTNOT")
  }

  render() {
    return (
      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <Header handleLogout={this.handleLogout.bind(this)} user={this.state.user}/>
            <h1>Accueil</h1>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <div className="section flexbox flex-column" id="s1">
                    <i className="fas fa-trophy fa-3x"></i>
                    <h3>Meilleur buteur</h3>
                    <h5>{this.state.best_scorer}</h5>
                </div>
              </div>
              <div className="col-md-9">
                <div className="section flexbox" id="s2">
                  <h1>Buts marqués</h1>
                  {this.state.goals_stat 
                    ? ( <Pie repositories={this.state.goals_stat} /> )
                    : ( <span></span> )
                  }
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3">
                <div className="section flexbox flex-column" id="s3">
                  <i className="fas fa-trophy fa-3x"></i>
                  <h3>Meilleur équipe</h3>
                  {this.state.best_team
                    ? (
                        <h5> {this.state.best_team.player_1} & {this.state.best_team.player_2} </h5>
                      )
                    : ( <span></span> )
                  }
                </div>
              </div>
              <div className="col-md-9">
                <div className="section flexbox" id="s4">Section 4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

//export default withAuth(Home);

export default connect(state => state)(App);