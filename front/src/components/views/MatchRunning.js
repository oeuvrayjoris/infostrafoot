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
			teams: [
				{ id:0, name: 'Equipe 1', players: [
                        {id:2, firstname: "Zinédine", lastname: "Zidane", username: "Zizou"},
                        {id:4, firstname: "David", lastname: "Nasr", username: "Lolilol"}
                    ]
                },
				{ id:1, name: 'Equipe 2', players: [
                        {id:2, firstname: "Zinédine", lastname: "Zidane", username: "Zizou"},
                        {id:4, firstname: "Rachid", lastname: "Nasr", username: "Lolilol"}
                    ]
                }
			]
        }
        
	}

  render() {
      
    const { teams } = this.state
    
    console.log(teams)
    
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
                                <button className="btn btn-default">But</button>
                                <button className="btn btn-default">Contre son camp</button>
                                <button className="btn btn-default">Gamelle</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4 flexbox flex-column">
                    <button className="btn btn-default">Annuler la dernière action <i className="fas fa-undo-alt"></i></button>
                    <div className="timer">05:45</div>
                    <div className="score">
                        <span id="score1">5</span> - <span id="score2">2</span>
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
                            <div className="row">
                                <button className="btn btn-default">But</button>
                                <button className="btn btn-default">Contre son camp</button>
                                <button className="btn btn-default">Gamelle</button>
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
