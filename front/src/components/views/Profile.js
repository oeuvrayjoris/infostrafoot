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

/**
	 * Profile page. Works only if player is connected. Then, it renders player's infos & stats
*/
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

  /**
	 * Logout the player if he is connected and we hit the logout button
	 */
  handleLogout() {
    this.ApiService.logout()
  }

  /**
	 * Called immediatly before mounting occurs.
   * Set the state with player's info (id)
	 */
  componentWillMount() {
    if (this.ApiService.loggedIn() === true) {
      const profil = this.ApiService.getMyProfil()
      Promise.all([profil])
      .then(([profil]) => {
        const newInfos = this.state.infos_player
        newInfos.id = profil.id
        console.log(newInfos.id)
        //newInfos.id = 1
        this.setState({infos_player: newInfos})
      })
    }
  }
  /**
	 * Called immediatly after a component is mounted
   * Set the state with player's stats
	 */
  componentDidMount() {
    if (this.ApiService.loggedIn() === true) {
      this.setMyProfil(this.getStats())  // Calls API and then setState with the result
    }      
  }

  /**
	 * Get player's stats from the API service
   * 
   * @returns Promise of the stats
	 */
  getStats() {
    const stats = this.ApiService.getProfil(this.state.infos_player.id)

    return Promise.all([stats])
  }

  /**
	 * Set the state by calling all the getFunctions with the promise we catched
   * 
	 */
  setMyProfil(result) {
    result.then(([stats]) => {
      this.setState({
        victory_stat : (stats) ? this.getVictoryStat(stats) : null,
        best_role : (stats) ? this.getBestRole(stats) : null,
        match_stat : (stats) ? this.getGoals(stats) : null,
        playtime : (stats) ? this.getPlayTime(stats) : null
      })
    })
  }

  /**
	 * Get player's infos (id, username, name, etc...)
   * 
   * @param profil a promise returned by the API
   * @returns JSON object containing all the player's infos
	 */
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

  /**
	 * Get player's victory stat (number of defeats and victories)
   * 
   * @param stats a promise containing all player's stats returned by the API
   * @returns JSON object formated for NIVO Pie
	 */
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

  /**
	 * Get the win / lose ratio
   * 
   * @returns A string containing the w/l ratio (ex: "87 %")
	 */
  getRatio() {
    const victories = this.state.victory_stat[0].value
    const defeats = this.state.victory_stat[1].value
    
    return Math.floor(victories/(victories+defeats)*100) + " %"
  }

  /**
	 * Get the player's best role
   * 
   * @param stats a promise containing all player's stats returned by the API
   * @returns A string saying the player's best role (striker or defender)
	 */
  getBestRole(stats) {
    return (
      (stats.best_role === "striker")
        ? "Attaquant"
        : "Défenseur"
    )
  }

  /**
	 * Get the goals of player's latest match to print the history of the match
   * 
   * @param stats a promise containing all player's stats returned by the API
   * @returns JSON object formated for NIVO Line
	 */
  getGoals(stats) {
    // We store the latest match, its goals and its teams
    const match = stats.last_match
    const goals = match.goals
    const teams = match.teams
    // We store the index of the player's team (0 or 1)
    const myTeamIndex = this.knowMyTeam(teams)
    // We store the creation date of the match to use it as a baseTime
    const baseTime = this.getTime(match, false)
    // We store an array of goals (which team, which number of goal, which type)
    const goalIndexes = goals.map((goal, index) => (
      {"team_num":this.getGoalTeam(goal, teams),"index":index,"gamelle":goal.gamelle,"own_goal":goal.own_goal}
    ))
    // We store an array containing all the times where a goal happened
    const goalTime = goals.map(goal => this.getGoalTime(goal, baseTime)).map(time => this.timeToString(time))t
    // We store the evolution of the scores of both teams
    const scores = this.getScores(goalIndexes)

    // We formate the datas for Nivo, time in abscisse, score in ordinates
    // We use reduce to delete the duplicated keys (2 goals in the same second), otherwise we have a bug due to Nivo
    const dataTeam1 = goalTime.map((time, index) => ({
        "x":time,
        "y":scores[index].score_1
      })).reduce((x, y) => x.findIndex(e=>e.x===y.x)<0 ? [...x, y]: x, [])

    const dataTeam2 = goalTime.map((time, index) => ({
        "x":time,
        "y":scores[index].score_2
      })).reduce((x, y) => x.findIndex(e=>e.x===y.x)<0 ? [...x, y]: x, [])

    // We add a data to set the beggining of the game
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

  /**
	 * Get the index of player's team (0 or 1)
   * 
   * @param teams a JSON object containing both teams
   * @returns the index of player's team (0 or 1)
	 */
  knowMyTeam(teams) {
    // We check if player's id is in the first team, otherwise it means he is in the second team
    // I'm using if else because ternary doesn't work here, I don't know why
    if (teams[0].players[0].id === this.state.infos_player.id || teams[0].players[1].id === this.state.infos_player.id)
      return 0
    else return 1
  }

  /**
	 * To know the goal is from which team
   * 
   * @param goal,matchTeams the goal and the teams
   * @returns the index of goal's team (0 or 1)
	 */
  getGoalTeam(goal, matchTeams) {
    // Same as the function before
    if (matchTeams[0].players[0].id === goal.player_id || matchTeams[0].players[1].id === goal.player_id)
    return 0
    else return 1
  }

  /**
	 * This function formate a date string into a JSON object containing the time
   * 
   * @param object,played_time The object or string we want to formate. A boolean saying if it's the played_time or not
   * @returns a JSON object containing the hours, the minutes and the seconds
	 */
  getTime(object, played_time) {
    const time = (played_time) ? object.substr(11).split(":", 3) : object.created_at.substr(11).split(":", 3);
    const hour = time[0]
    const minutes = time[1]
    const seconds = time[2]

    return {"hour":hour,"minutes":minutes,"seconds":seconds}
  }

  /**
	 * To know the time when the goal was scorred according to the baseTime
   * 
   * @param goal,baseTime The goal and the baseTime
   * @returns a JSON object containing the hours, the minutes and the seconds
	 */
  getGoalTime(goal, baseTime) {
    const goalTime = this.getTime(goal, false)
    const _hour = goalTime.hour - baseTime.hour
    const _minutes = goalTime.minutes - baseTime.minutes
    const _seconds = goalTime.seconds - baseTime.seconds

    const hour = (_hour < 0) ? _hour+24 : _hour
    const minutes = (_minutes < 0) ? _minutes+60 : _minutes
    const seconds = (_seconds < 0) ? _seconds+60 : _seconds

    return {"hour":hour,"minutes":minutes,"seconds":seconds}
  }

  /**
	 * Transform a JSON time object into a string ("00:00:00")
   * 
   * @param time a JSON object containing the hours, the minutes and the seconds
   * @returns a string containing the time ("00:00:00")
	 */
  timeToString(time) {
    const hour = (time.hour < 10) ? "0"+time.hour : time.hour
    const minutes = (time.minutes < 10) ? "0"+time.minutes : time.minutes
    const seconds = (time.seconds < 10) ? "0"+time.seconds : time.seconds
    return minutes+":"+seconds
    //return hour+":"+minutes+":"+seconds
  }

  /**
	 * Get an array containing teams scores during each goal moment of the match
   * 
   * @param goals a JSON object containing all the goals of the match
   * @returns a JSON object containing the scores of both teams
	 */
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

  /**
	 * Get the time the player played
   * 
   * @param stats a Promise containing player's stat
   * @returns a string containing played time (0h 0m 0s)
	 */
  getPlayTime(stats) {
    const time = this.getTime(stats.played_time, true)
    return (time.hour > 0)
      ? time.hour + "h " + time.minutes + "m " + time.seconds + "s"
      : (time.minutes > 0)
        ? time.minutes + "m " + time.seconds + "s"
        : time.seconds + "s"
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
