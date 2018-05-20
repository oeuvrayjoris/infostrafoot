import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Background from '../../img/novelli.jpg'
import Sword from '../../img/sword.png'
import ApiService from '../ApiService'

const Api = new ApiService();

/**
	* MatchRunning page. This is where we can play a match after creating it
*/
class MatchRunning extends Component {
    
    constructor(props) {
		super(props)
		this.state = {
            match_id: this.props.location.state.matchId,
            teams: this.props.location.state.teams,
            last_goal_id : 0,
            cancel_disabled : true,
            scores: [
                {
                    score : 0,
                    old_score : 0
                },
                {
                    score : 0,
                    old_score : 0
                }
            ],
            time: {},
            seconds: 0,
            match_ended : false
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.addGoal = this.addGoal.bind(this)
        this.endMatch = this.endMatch.bind(this)
    }

    /**
	 * Calls the Api logout route
	 */
    handleLogout() {
        this.ApiService.logout()
    }

    // TIMER FUNCTIONS

    /**
	 * Transform seconds to an object containing the minutes and the seconds
     * 
     * @param secs the number of seconds
     * @returns an object containing "m" the minutes and "s" the seconds
	 */
    secondsToTime(secs){    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "m": minutes,
          "s": seconds
        };
        return obj;
    }
    
    /**
	* Called immediatly after a component is mounted
    * Starts the timer
	*/
    componentDidMount() {
        let seconds = this.secondsToTime(this.state.seconds);
        this.setState({ time: seconds });
        this.startTimer()
    }

        
    /**
	* Called immediatly before a component is destroyed
    * Clear the timer
	*/
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    /**
	* Starts the timer. Update it each seconds
	*/
    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000); // Called each seconds
        }
    }
    
    /**
	* More like countUp. Add 1 second to the state.seconds
	*/
    countDown() {
        if (!this.state.match_ended) {
            // Add one second, set state so a re-render happens.
            let seconds = this.state.seconds + 1;
            this.setState({
                time: this.secondsToTime(seconds),
                seconds: seconds
            });
        }
    }
    
    // GOALS MANAGEMENT FUNCTIONS

    /**
    * Add a goal by calling the API with the right parameters and changing the state.
    * Handles the score changes according to the type of goal.
    * Handles the match ending if one score reachs 10.
    * Update the state
    *
    * @param e,team_num,player_num,gamelle,own_goal,role All the parameters telling which player scored and which type of goal it is
	*/
    addGoal(e, team_num, player_num, gamelle, own_goal, role) {
        e.preventDefault();
        const promise = Api.addGoal(this.state.teams[team_num].players[player_num].id, this.state.match_id, gamelle, own_goal, role)
        const scores = this.state.scores
        const cancel_disabled = this.state.cancel_disabled
        let match_ended = this.state.match_ended

        Promise.all([promise])
            .then(([result]) => {

                if (!cancel_disabled) {
                    scores.map(obj => (obj.old_score = obj.score))
                }
                
                (!gamelle && !own_goal)
                    ? scores[team_num].score++
                    : (gamelle)
                        ? (team_num === 0)
                            ? (scores[1].score === 0)
                                ? scores[0].score++
                                : scores[1].score--
                            : (scores[0].score === 0)
                                ? scores[1].score++
                                : scores[0].score--
                        : (team_num === 0)
                            ? scores[1].score++
                            : scores[0].score++
                
                if (scores[0].score === 10) match_ended = true
                if (scores[1].score === 10) match_ended = true

                this.setState({
                    last_goal_id : result.id,
                    cancel_disabled : false,
                    scores : scores,
                    match_ended : match_ended
                })
            })
    }

    /**
    * Update the state. Delete the last goal with an API. Get the previous score
	*/
    cancelAction() {
        const scores = this.state.scores

        Api.deleteGoal(this.state.last_goal_id)
            .then( () => {
                scores.map(obj => (obj.score = obj.old_score))
                
                this.setState({
                    cancel_disabled:true,
                    scores:scores,
                    match_ended:false
                }) 
            })
    }

    /**
    * Handle the end match button. Calls the API to update the match by telling which team is the winner and giving the end_time of the match
    * 
    * @param e the event
	*/
    endMatch(e) {
        e.preventDefault()
        
        Api.endMatch(
            this.state.match_id,
            (this.state.scores[0].score >= this.state.scores[1].score)
                ? this.state.teams[0].id
                : this.state.teams[1].id, 
            this.formatDate())
        this.setState({match_ended: true})
    }

    /**
    * Get today's date and converts it into a string ("2018-05-21 08:30:00"). Used for end_match time
    * 
    * @param e the event
    * @returns a string of today's date
	*/
    formatDate() {
        let d = new Date(),
        month = (d.getMonth()+ 1 < 10) ? "0" + (d.getMonth()+1) : (d.getMonth()+1),
        day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate(),
        year = d.getFullYear(),
        hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours(),
        minutes = d.getMinutes(),
        seconds = (d.getSeconds() < 10) ? "0" + d.getSeconds() : d.getSeconds();

        const today = year +  "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds

        return today
    }

    /**
    * Update the state by changing the role of the players
	*/
    switchRole(team_num) {
        const players = this.state.teams[team_num].players
        const players_new = [players[1], players[0]]

        const new_teams = this.state.teams.map((team, index) => 
            (index === team_num)
            ? {...team, "players":players_new}
            : team
        )
        
        this.setState({
            "teams":new_teams
        })
    }

  render() {
    const { teams , cancel_disabled, scores, match_ended} = this.state
    
    return (

<div className="row" id="main" style={{ height: window.innerHeight}}>
    <div className="col-md-2 height100">
        <Menu />
    </div>
    <div className="col-md-10" id="content">
        <div className="container">
            <Header handleLogout={this.handleLogout.bind(this)}/>
            <h1>Match en cours</h1>
            <hr />
            <div className="row">
                <div className="col-md-4 flexbox flex-column" id="team1">
                    <h3>{teams[0].name}</h3>
                    {teams[0].players.map(({ id, firstname, lastname, username }, index) => (
                        <div className="width100">
                            <div className="row flexbox role runnning" key={id}>
                                {(index === 0)
                                    ? <img src={Sword} alt="sword" className="sword" />
                                    : <i className="fas fa-shield-alt fa-2x"></i>}
                                <div className="col-md-3">
                                    <div className="photo3">
                                        <div style={{ backgroundImage: `url(${Background})` }}></div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="left">
                                        <h4>{firstname} {lastname}</h4>
                                        <h5>@{username}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row flexbox buttons">
                                <button
                                    className="btn btn-default"
                                    disabled={match_ended}
                                    onClick={e => this.addGoal(e, 0, index, false, false, index===0 ? "striker" : "defender")}
                                >But</button>
                                <button
                                    className="btn btn-default"
                                    disabled={match_ended}
                                    onClick={e => this.addGoal(e, 0, index, false, true, index===0 ? "striker" : "defender")}
                                >Contre son camp</button>
                                <button
                                    className="btn btn-default"
                                    disabled={match_ended}
                                    onClick={e => this.addGoal(e, 0, index, true, false, index===0 ? "striker" : "defender")}
                                >Gamelle</button>
                            </div>
                        </div>
                    ))}
                    <button
                        className="btn btn-default"
                        disabled={match_ended}
                        onClick={e => this.switchRole(0)}
                    >SWITCH</button>
                </div>
                <div className="col-md-4 flexbox flex-column">
                    <button
                        className="btn btn-default"
                        onClick={e => this.cancelAction()}
                        disabled={cancel_disabled}
                    >Annuler la dernière action <i className="fas fa-undo-alt"></i></button>
                    <div className="timer">
                    {
                        (this.state.time.m < 10)
                        ? "0" + this.state.time.m
                        : this.state.time.m
                    }:
                    {
                        (this.state.time.s < 10)
                        ? "0" + this.state.time.s
                        : this.state.time.s
                    }</div>
                    <div className="score">
                        <span id="score1">{scores[0].score}</span> - <span id="score2">{scores[1].score}</span>
                    </div>
                </div>
                <div className="col-md-4 flexbox flex-column" id="team2">
                    <h3>{teams[1].name}</h3>
                    {teams[1].players.map(({ id, firstname, lastname, username }, index) => (
                        <div className="width100">
                            <div className="row flexbox role" key={id}>
                                {(index === 0)
                                    ? <i className="fas fa-shield-alt fa-2x"></i>
                                    : <img src={Sword} alt="sword" className="sword" />}
                                <div className="col-md-3">
                                    <div className="photo3">
                                        <div style={{ backgroundImage: `url(${Background})` }}></div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="left">
                                        <h4>{firstname} {lastname}</h4>
                                        <h5>@{username}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row flexbox buttons">
                                <button
                                    className="btn btn-default"
                                    disabled={match_ended}
                                    onClick={e => this.addGoal(e, 1, index, false, false, index===0 ? "striker" : "defender")}
                                >But</button>
                                <button
                                    className="btn btn-default"
                                    disabled={match_ended}
                                    onClick={e => this.addGoal(e, 1, index, false, true, index===0 ? "striker" : "defender")}
                                >Contre son camp</button>
                                <button
                                    className="btn btn-default"
                                    disabled={match_ended}
                                    onClick={e => this.addGoal(e, 1, index, true, false, index===0 ? "striker" : "defender")}
                                >Gamelle</button>
                            </div>
                        </div>
                    ))}
                    <button
                        className="btn btn-default"
                        disabled={match_ended}
                        onClick={e => this.switchRole(1)}
                    >SWITCH</button>
                </div>
            </div>
            <div className="flexbox">
                <button className="btn btn-success" onClick={e => this.endMatch(e)}>Terminer le match</button>
            </div>
                {match_ended === true && 
                    <div>
                        <h1>Match terminé !</h1>
                        <Link to="/match">Refaire un match</Link>
                    </div>}
            <Footer />
        </div>
    </div>
</div>

    );
  }
    
};

export default MatchRunning;
