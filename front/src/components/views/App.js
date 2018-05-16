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
import Bar from '../Bar';

const Auth = new AuthService();

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

    this.ApiService = new ApiService();
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout() {
    this.ApiService.logout()
  }

  // SET STATS FUNCTIONS

  componentDidMount() {
    this.setStats(this.getStats())
  }

  getStats() {
    const home = this.ApiService.home()
    const goals = this.ApiService.getGoals()

    return Promise.all([home, goals])
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

      // Team
      this.setTeamMatchStat(best_team.id)
    })
  }

  // GOALS
  getGoalsStat(gamelles, own_goal, goal) {
    return (
      [
        {
            "id": "Buts",
            "label": "Buts",
            "value": goal
        },
        {
            "id": "Gamelles",
            "label": "Gamelles",
            "value": gamelles
        },
        {
            "id": "Contre Son Camp",
            "label": "Contre Son Camp",
            "value": own_goal
        }
      ]
    )
  }

  setTeamMatchStat(team_id) {
    this.ApiService.getTeam(team_id)
      .then(result => {
        this.setState({
          team_stat: this.getTeamMatchStat(result)
        })
      })
  }

  // Find the matches of the 7 last days then count each victorie and defeat
  // Returns an array of objects used with Nivo Bar
  getTeamMatchStat(team_stat) {
    const today = this.getDayMonthYear(this.getTodayDate());
    const lastMatches = this.getLastMatches(today, team_stat.matches)
    const lastDays = this.getLastDays(today).map(day => this.formatDate(day))
    const victories = lastDays.map(day => 
      lastMatches.victories.filter(match =>
        (match.end_time.substr(8,2) === day.substr(0,2))
      ).length
    )
    const defeats = lastDays.map(day => 
      lastMatches.defeats.filter(match =>
        (match.end_time.substr(8,2) === day.substr(0,2))
      ).length
    )
    
    return (
      [0,1,2,3,4,5,6].map(num => (
        {
          "jour":lastDays[num],
          "victoire":victories[num],
          "défaîte":-defeats[num]
        }
      ))
    )
  }
  // We store the victories and defeats of the last 7 days
  getLastMatches(today, matches) {
      const lastMatches = matches.filter(match => (
        this.compareDate(today, this.getDayMonthYear(match.end_time))
      ))
      const victories = lastMatches.filter(match => (match.pivot.winner === this.state.best_team.id))
      const defeats = lastMatches.filter(match => (match.pivot.winner !== this.state.best_team.id))

      return {victories:victories, defeats:defeats}
  }

  // DATE FUCTIONS

  getTodayDate() {
    let d = new Date(),
    month = d.getMonth() + 1,
    day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate(),
    year = d.getFullYear()

    return year +  "-" + month + "-" + day
  }

  getDayMonthYear(date) {
    // Date must be : year +  "-" + month + "-" + day + "whatever"

    const splitted = date.substr(0,10).split("-", 3);
    return ({
      year:parseInt(splitted[0]),
      month:parseInt(splitted[1]),
      day:parseInt(splitted[2])
    })
  }

  compareDate(today, date) {
    return ((today.year === date.year)
              ? ((today.month === date.month)
                  ? ((today.day <= (date.day+7))
                      ? true
                      : false
                    )
                  : ((today.month === date.month+1)
                      ? ((30+today.day <= (date.day+7))
                          ? true
                          : false
                        )
                      : false
                    )
                )
              : false
    )
  }

  formatDate(date) {
    // Date must be : {year:,month:,day:}
    const day = (date.day < 10) ? "0" + date.day : date.day
    const month = (date.month < 10) ? "0" + date.month : date.month
    const year = date.year

    return day +  "-" + month + "-" + year
  }

  getLastDays(today) {
    const days = [6,5,4,3,2,1,0]
    const lastDays = days.map(day => (
      (today.day-day < 1)
        ? {day:31+(today.day-day), month:today.month-1, year:today.year}
        : {day:today.day-day, month:today.month, year:today.year}
    ))
    
    return lastDays
  }

  render() {
    return (
      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <Header handleLogout={this.handleLogout.bind(this)}/>
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
                    <div className="flexbox flex-column">
                        <i className="fas fa-futbol fa-3x"></i>
                        <h3>Buts marqués par l'ensemble des joueurs</h3>
                    </div>
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
                <div className="section flexbox" id="s4">
                  {this.state.team_stat 
                    ? ( <Bar repositories={this.state.team_stat} /> )
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

//export default withAuth(Home);

export default App;
