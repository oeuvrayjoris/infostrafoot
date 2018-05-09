import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';
import Background from '../../img/novelli.jpg'

import Team from '../Team'
import Player from '../Player'
import ItemTypes from '../ItemTypes'
import ApiService from '../ApiService'

const Api = new ApiService();

class MatchRunning extends Component {
    
    constructor(props) {
		super(props)
		this.state = {
            match_id: 1,
			teams: [
				{ id:0, name: 'Equipe 1', players: [
                        {id:1, firstname: "Zinédine", lastname: "Zidane", username: "Zizou"},
                        {id:2, firstname: "David", lastname: "Nasr", username: "Lolilol"}
                    ]
                },
				{ id:1, name: 'Equipe 2', players: [
                        {id:3, firstname: "Joris", lastname: "Oeuvray", username: "LeGamin"},
                        {id:4, firstname: "Rachid", lastname: "Nasr", username: "Lolilol"}
                    ]
                }
            ],
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
            seconds: 0
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.addGoal = this.addGoal.bind(this)
    }

    // TIMER FUNCTIONS

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
    
    componentDidMount() {
        let seconds = this.secondsToTime(this.state.seconds);
        this.setState({ time: seconds });
        this.startTimer()
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    startTimer() {
        if (this.timer == 0) {
            this.timer = setInterval(this.countDown, 1000); // Called each seconds
        }
    }
    
    countDown() {
        // Add one second, set state so a re-render happens.
        let seconds = this.state.seconds + 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds
        });
    }
    
    // GOALS MANAGEMENT FUNCTIONS

    addGoal(e, team_num, player_num, gamelle, own_goal, role) {
        e.preventDefault();
        const promise = Api.addGoal(this.state.teams[team_num].players[player_num].id, this.state.match_id, gamelle, own_goal, role)
        const scores = this.state.scores
        const cancel_disabled = this.state.cancel_disabled

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
                                ? console.log("Déso, useless goal")
                                : scores[1].score--
                            : (scores[0].score === 0)
                                ? console.log("Déso, useless goal")
                                : scores[0].score--
                        : (team_num === 0)
                            ? scores[1].score++
                            : scores[0].score++
                

                this.setState({
                    last_goal_id : result.id,
                    cancel_disabled : false,
                    scores : scores
                })
            })
    }

    cancelAction() {
        console.log(this.state.last_goal_id)
        const scores = this.state.scores
        Api.deleteGoal(this.state.last_goal_id)
            .then( () => {
                scores.map(obj => (obj.score = obj.old_score))
                this.setState({
                    cancel_disabled:true,
                    scores:scores
                }) 
            })
    }

  render() {
      
    const { teams , cancel_disabled, scores} = this.state
    
    return (

<div className="row" id="main" style={{ height: window.innerHeight}}>
    <div className="col-md-2 height100">
        <Menu />
    </div>
    <div className="col-md-10" id="content">
        <div className="container">
            <Header />
            <h1>Match en cours</h1>
            <hr />
            <div className="row">
                <div className="col-md-4 flexbox flex-column" id="team1">
                    <h3>{teams[0].name}</h3>
                    {teams[0].players.map(({ id, firstname, lastname, username }, index) => (
                        <div className="width100">
                            <div className="row flexbox role runnning" key={id}>
                                <i className="fas fa-shield-alt fa-2x"></i>
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
                                    onClick={e => this.addGoal(e, 0, index, false, false, index===0 ? "striker" : "defender")}
                                >But</button>
                                <button
                                    className="btn btn-default"
                                    onClick={e => this.addGoal(e, 0, index, false, true, index===0 ? "striker" : "defender")}
                                >Contre son camp</button>
                                <button
                                    className="btn btn-default"
                                    onClick={e => this.addGoal(e, 0, index, true, false, index===0 ? "striker" : "defender")}
                                >Gamelle</button>
                            </div>
                        </div>
                    ))}
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
                                <i className="fas fa-shield-alt fa-2x"></i>
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
                                    onClick={e => this.addGoal(e, 1, index, false, false, index===0 ? "striker" : "defender")}
                                >But</button>
                                <button
                                    className="btn btn-default"
                                    onClick={e => this.addGoal(e, 1, index, false, true, index===0 ? "striker" : "defender")}
                                >Contre son camp</button>
                                <button
                                    className="btn btn-default"
                                    onClick={e => this.addGoal(e, 1, index, true, false, index===0 ? "striker" : "defender")}
                                >Gamelle</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flexbox">
                <button className="btn btn-success" onClick={e => this.handleSubmit(e)}>Arrêter le match</button>
            </div>
        </div>
    </div>
</div>

    );
  }
    
};

export default MatchRunning;
