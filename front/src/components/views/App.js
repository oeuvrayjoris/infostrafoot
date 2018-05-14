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

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: null,
      best_scorer : null,
      best_team : null,
      goals_stat : null
    }

    this.ApiService = new ApiService();
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  getStats() {
    const home = this.ApiService.home()
    const goals = this.ApiService.getGoals()

    return Promise.all([home, goals])
  }

  componentDidMount() {
    this.setStats(this.getStats())
  }

  setStats(results) {
    results.then(([home, goals]) => {
      // Home
      const best_team = [home.best_teams[0].players[0].username, home.best_teams[0].players[1].username]
      // Goals
      const gamelles = goals.filter(goal => (goal.gamelle === 1))
      const own_goal = goals.filter(goal => (goal.own_goal === 1))
      const goal = goals.length - gamelles.length - own_goal.length

      this.setState({
        best_scorer: home.best_scorers[0].username,
        best_team: best_team,
        goals_stat : this.getGoalsStat(gamelles.length, own_goal.length, goal)
      })
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

  handleLogout() {
    this.ApiService.logout()
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
                <div className="section flexbox" id="s3">Section 3</div>
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