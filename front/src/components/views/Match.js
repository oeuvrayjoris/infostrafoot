import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';

import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import Team from '../Team'
import Player from '../Player'
import ItemTypes from '../ItemTypes'
import ApiService from '../ApiService'

const Api = new ApiService();

class Match extends Component {

    constructor(props) {
		super(props)
		this.state = {
            credentials: {
                searchName: ''
            },
			teams: [
				{ id:0, name: 'Equipe 1', players: [] },
				{ id:1, name: 'Equipe 2', players: [] }
			],
			players: [],
			droppedPseudos: [],
        }
        
        this.setPlayers = this.setPlayers.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.createTeams = this.createTeams.bind(this)
        this.changeTeamID = this.changeTeamID.bind(this)
        this.createMatch = this.createMatch.bind(this)
        this.searchPlayer = this.searchPlayer.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.displayPlayers = this.displayPlayers.bind(this)
        this.showAll = this.showAll.bind(this)
	}
    
    isDropped(username) {
		return this.state.droppedPseudos.indexOf(username) > -1
    }
    
    componentDidMount() {
        Api.getPlayers().then(result => this.setPlayers(result))
    }

    setPlayers(res) {
        const players = res.map(player => ({
            id: player.id,
            firstname: player.firstname,
            lastname: player.lastname,
            username: player.username,
            display: 'block',
            type: ItemTypes.BOX
        }))

        this.setState({
            players : players
        })
    }

    changeTeamID(num, id) { // Unused function
        const { teams } = this.state
        teams[num].id = id
        this.setState({teams:teams})
    }

    createTeams() {
        const p1 = Api.addTeam(this.state.teams[0].players[0].id, this.state.teams[0].players[1].id)
        const p2 = Api.addTeam(this.state.teams[1].players[0].id, this.state.teams[1].players[1].id)

        return Promise.all([p1, p2])
            .then(([team1, team2]) => {
                return [team1.id, team2.id]
            })
    }

    createMatch() {
        this.createTeams().then(([t1, t2]) => {
            console.log("IDs : " + t1, t2)
            Api.addMatch(t1, t2)
            .then(match => {
                console.log("Match id : " + match.id)
                // Ici, créer MatchRunning ?
            })
        })
    }

    handleSubmit(e){
        e.preventDefault();
        
        (this.state.teams[0].players.length === 2 && this.state.teams[1].players.length === 2) 
        ? this.createMatch()
        : console.log("Must add 4 players")

        // Redirection vers MatchRunning
    }

    // Search Functions

    handleChange(e) {
        const field = e.target.name;
        const credentials = this.state.credentials;
        credentials[field] = e.target.value;
        this.setState({
          credentials: credentials
        });
    }

    searchPlayer(e) {
        e.preventDefault();
        Api.searchPlayer(this.state.credentials.searchName)
            .then((result) => {
                (result === undefined)
                ? (console.log("No player found"))
                : this.displayPlayers(result)
            })
    }

    displayPlayers(result) {
        const players = this.state.players

        console.log(players)
        console.log(result.players)
       
        players.map(player => (
            result.players.map(p => (
                (player.username === p.username)
                ? player.display = 'block'
                : player.display = 'none'
            ))
        ))

        this.setState({players : players})
    }

    showAll(e) {
        e.preventDefault();
        const players = this.state.players
        // Set all the display back to normal
        players.map(player => player.display = 'block')

        this.setState({players : players})
    }

  render() {
      
    const { teams, players } = this.state
    
    return (
      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <Header />
            <h1>Créer un match</h1>
            <hr />
            <div>
				<div className="row">
                    <Team
                        id={1}
                        name={teams[0].name}
                        players={teams[0].players}
                        onDrop={item => this.handleDrop(0, item)}
                        key={teams[0].name}
                    />
                    <div className="col-md-4 flexbox">
                        <p className="versus">VS</p>
                    </div>
                    <Team
                        id={2}
                        name={teams[1].name}
                        players={teams[1].players}
                        onDrop={item => this.handleDrop(1, item)}
                        key={teams[1].name}
                    />
				</div>
                <div className="flexbox">
                    <button 
                      className="btn btn-success"
                      onClick={e => this.handleSubmit(e)}
                      >Créer un match</button>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-3">
                        <form className="input-group search">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Rechercher un joueur..."
                                name="searchName"
                                value={this.state.credentials.searchName}
                                onChange={e => this.handleChange(e)}
                            />
                            <span className="input-group-btn">
                                <button
                                    className="btn btn-default"
                                    type="button"
                                    onClick={e => this.searchPlayer(e)}
                                ><i className="fas fa-search"></i></button>
                            </span>
                            <div className="flexbox">
                                <button 
                                    className="btn btn-success"
                                    type="button"
                                    onClick={e => this.showAll(e)}
                                >Montrer tout</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-9"></div>
                </div>
                <div className="row">
					{players.map(({ id, firstname, lastname, username, display }, index) =>  {
                        if(!(this.isDropped(username))) {
                            return (
						<Player
                            id={id}
							firstname={firstname}
							lastname={lastname}
                            username={username}
                            display={display}
							isDropped={this.isDropped(username)}
							key={id}
						/>
                        )}
                    })}
                </div>
			</div>
        </div>
        </div>
      </div>
    );
  }
    
    handleDrop(index, item) {
        const { username } = item
        const droppedPseudos = username ? { $push: [username] } : {}
        
        console.log(this.state.teams)

        this.setState(
            update(this.state, {
                teams: {
                    [index]: {
                        players: {
                            $push: [item],
                        },
                    },
                },
                droppedPseudos,
            }),
        )
    }
};

export default DragDropContext(HTML5Backend)(Match);
