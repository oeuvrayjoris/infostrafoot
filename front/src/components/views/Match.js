// Importing libraries
import React, { Component } from 'react';
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
// Importing components
import Menu from '../Menu.js';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Team from '../Team'
import Player from '../Player'
import ItemTypes from '../ItemTypes'
import ApiService from '../ApiService'
// Importing styles
import '../../styles/sass/style.scss';

const Api = new ApiService();

/**
	* Match page. This is where we can create a match by dropping players into teams
*/
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
            matchId: -1
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

        Api.getPlayers().then(result => this.setPlayers(result))
	}

    /**
	 * Calls the Api logout route
	 */
    handleLogout() {
        this.ApiService.logout()
    }
    
    /**
	 * Tells if a player is dropped on a team or not
     * 
     * @param username the username of the player we want to check-in
     * @returns a boolean telling whether or not the player is dropped
	 */
    isDropped(username) {
		return this.state.droppedPseudos.indexOf(username) > -1
    }
    
    /**
	 * Set the state by creating players objects
     * 
     * @param res the response of the API call
	 */
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

    /**
	 * Change team Id
     * 
     * @param num,id the number of the team (1 or 2) and the id of the team concerned
	 */
    changeTeamID(num, id) { // Unused function
        const { teams } = this.state
        teams[num].id = id
        this.setState({teams:teams})
    }

    /**
	 * Create teams when all players are dropped in the teams by calling the Api with the state
     * 
     * @returns a Promise containing both teams
	 */
    createTeams() {
        const p1 = Api.addTeam(this.state.teams[0].players[0].id, this.state.teams[0].players[1].id)
        const p2 = Api.addTeam(this.state.teams[1].players[0].id, this.state.teams[1].players[1].id)

        return Promise.all([p1, p2])
            .then(([team1, team2]) => {
                return [team1.id, team2.id]
            })
    }

    /**
	 * Create a new match by creating teams and then pushing match infos into matchrunning state
     * 
     * @returns a Promise containing both teams
	 */
    createMatch() {
        this.createTeams().then(([t1, t2]) => {
            Api.addMatch(t1, t2)
            .then(match => {
                const newTeams = this.state.teams
                newTeams[0].id = t1
                newTeams[1].id = t2
                this.setState({matchId: match.id, teams: newTeams})
                this.props.history.push({
                  pathname: '/matchrunning',
                  state: { matchId: this.state.matchId, teams: this.state.teams}
                })
            })
        })
    }

    /**
    * Handle the submit event when pressing the create match button. Check if we can create a match or not
    * 
    * @param e the event that happened
    */
    handleSubmit(e){
        e.preventDefault();
        
        (this.state.teams[0].players.length === 2 && this.state.teams[1].players.length === 2) 
        ? this.createMatch()
        : console.log("Must add 4 players")
    }

    // SEARCH FUNCTIONS

    /**
	* Handle the changed values on the search bar to display the letters the player is typing
    * 
    * @param e the event that happened
	*/
    handleChange(e) {
        const field = e.target.name;
        const credentials = this.state.credentials;
        credentials[field] = e.target.value;
        this.setState({
          credentials: credentials
        });
    }

    /**
	* Calls the Api to search for players and then display the players we found
    * 
    * @param e the event that happened
	*/
    searchPlayer(e) {
        e.preventDefault();
        Api.searchPlayer(this.state.credentials.searchName)
            .then((result) => {
                (result === undefined)
                ? (console.log("No player found"))
                : this.displayPlayers(result)
            })
    }

    // La fonction n'est pas très propre, il ne faut pas modifier le tableau dans le map + il ne faut pas gérer le css dans React
    /**
	* Display the players we searched for
    * 
    * @param result the response of the promise
	*/
    displayPlayers(result) {
        const players = this.state.players

        players.map(player => player.display = 'none')

        //players.some(player => result.players.map(p => p.username).includes(player.username))
       
        result.players.map(player => (
            players.map(p => (
                (player.username === p.username)
                ? /*{...p, isDisplayed:true}*/p.display = 'block'
                : 0/*{...p, isDisplayed:false}*/
            ))
        ))
        this.setState({players : players})
    }

    /**
	* Display all players by pressing the Show All button
    * 
    * @param e the event that happened
	*/
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
            <Header handleLogout={this.handleLogout.bind(this)}/>
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

                <div className="row search">
                    <div className="col-md-3">                        
                        <form className="input-group">
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
                        </form>
                    </div>
                    <div className="col-md-9">
                        <button 
                            className="btn btn-default right"
                            type="button"
                            onClick={e => this.showAll(e)}
                        >Montrer tout</button>
                    </div>
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
                        else
                            return null
                    })}
                </div>
			</div>
            <Footer />
        </div>
        </div>
      </div>
    );
  }
    
    handleDrop(index, item) {
        const { username } = item
        const droppedPseudos = username ? { $push: [username] } : {}
        
        //console.log(this.state.teams)
        if (this.state.teams[index].players.length < 2) {
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
    }
};

export default DragDropContext(HTML5Backend)(Match);
