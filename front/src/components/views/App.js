// Importing Libraries
import React, { Component } from 'react';
// Importing Styles
import '../../styles/sass/style.scss';
// Importing Components
import Menu from '../Menu.js';
import Header from '../Header.js';
import Footer from '../Footer.js';
import ApiService from '../ApiService'
import Pie from '../Pie';
import Bar from '../Bar';

/**
	 * App page. This is the home page wher we land. It shows global statistics (best player, best team ...)
*/
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

  /**
	 * Set the state telling if player is authenticated or not
   * 
   * @param authenticated a boolean telling if the player is authenticated or not
	 */
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  /**
	 * Calls the Api logout route
	 */
  handleLogout() {
    this.ApiService.logout()
  }

  // SET STATS FUNCTIONS

  /**
	 * Called immediatly after a component is mounted
   * Set the state with app stats
	 */
  componentDidMount() {
    this.setStats(this.getStats())
  }

  /**
	 * Get the global stats by using the API
   * 
   * @returns a Promise containing the home stats and all the goals
	 */
  getStats() {
    const home = this.ApiService.home()
    const goals = this.ApiService.getGoals()

    return Promise.all([home, goals])
  }

  /**
	 * Set the state with all needed stats
   * 
   * @param results the promises of the API calls
	 */
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

  /**
	 * Get the goals types counted and formated for NIVO Pie
   * 
   * @param gamelles,own_goal,goal the number of gamelles, own goals and goals
   * @returns a JSON object formated for NIVO Pie
	 */
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

  /**
	 * Set the team_stat state of the best team by cusing the API
   * 
   * @param team_id the id of the team we want to get the stats from
	 */
  setTeamMatchStat(team_id) {
    this.ApiService.getTeam(team_id)
      .then(result => {
        this.setState({
          team_stat: this.getTeamMatchStat(result)
        })
      })
  }

  /**
	 * Find the matches of the 7 last days then count each victorie and defeat
   * 
   * @param team_stat the team stats
   * @returns Returns an array of objects used with Nivo Bar
	 */
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

  /**
	 * We store the victories and defeats of the last 7 days
   * 
   * @param today,matches today's date and all the matches of the best team
   * @returns a JSON object containing the count of victories and defeats of the best team
	 */
  getLastMatches(today, matches) {
      const lastMatches = matches.filter(match => (
        this.compareDate(today, this.getDayMonthYear(match.end_time))
      ))
      const victories = lastMatches.filter(match => (match.pivot.winner === this.state.best_team.id))
      const defeats = lastMatches.filter(match => (match.pivot.winner !== this.state.best_team.id))

      return {victories:victories, defeats:defeats}
  }

  // DATE FUCTIONS

  /**
	 * Get today's date
   * 
   * @returns a string containing today's date ("2018-05-21")
	 */
  getTodayDate() {
    let d = new Date(),
    month = d.getMonth() + 1,
    day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate(),
    year = d.getFullYear()

    return year +  "-" + month + "-" + day
  }

  /**
	 * Get the formated JSON version of a date
   * 
   * @param date the date we want to convert
   * @returns a JSON object containing the year, the month and the day (integers)
	 */
  getDayMonthYear(date) {
    // Date must be : year +  "-" + month + "-" + day + "whatever"

    const splitted = date.substr(0,10).split("-", 3);
    return ({
      year:parseInt(splitted[0]),
      month:parseInt(splitted[1]),
      day:parseInt(splitted[2])
    })
  }

  /**
	 * Tells if a date is on the same week as today's date
   * 
   * @param today,date today's date and the date we want to compare
   * @returns true if the date is on the same week, false otherwise
	 */
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

  /**
	 * Converts a JSON date object into a string
   * 
   * @param date the date we want to convert
   * @returns the date in string format ("21-05-2018")
	 */
  formatDate(date) {
    // Date must be : {year:,month:,day:}
    const day = (date.day < 10) ? "0" + date.day : date.day
    const month = (date.month < 10) ? "0" + date.month : date.month
    const year = date.year

    return day +  "-" + month + "-" + year
  }

  /**
	 * Get an array of JSON objects of the 7 last dates counting today
   * 
   * @param today today's date
   * @returns an array of JSON objects of the 7 last dates counting today
	 */
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
              <Footer />
          </div>
        </div>
      </div>
    );
  }
};

//export default withAuth(Home);

export default App;
