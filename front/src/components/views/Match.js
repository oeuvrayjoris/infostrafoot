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
			teams: [
				{ name: 'Equipe 1', players: [] },
				{ name: 'Equipe 2', players: [] }
			],
			players: [],
			droppedPseudos: [],
        }
        
        this.setPlayers = this.setPlayers.bind(this)
	}
    
    isDropped(username) {
		return this.state.droppedPseudos.indexOf(username) > -1
    }
    
    componentDidMount() {
        Api.getPlayers().then(result => this.setPlayers(result))
    }

    setPlayers(res) {
        var array = res.map(player => ({
            id: player.id,
            firstname: player.firstname,
            lastname: player.lastname,
            username: player.username,
            type: ItemTypes.BOX
        }))

        this.setState({
            players : array
        })
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
                    <button className="btn btn-success">Créer un match</button>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-3">
                        <form className="input-group search">
                            <input type="text" className="form-control" placeholder="Rechercher un joueur..." />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button"><i className="fas fa-search"></i></button>
                            </span>
                        </form>
                    </div>
                    <div className="col-md-9"></div>
                </div>
                <div className="row">
					{players.map(({ id, firstname, lastname, username }, index) =>  {
                        if(!(this.isDropped(username))) {
                            return (
						<Player
							firstname={firstname}
							lastname={lastname}
                            username={username}
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
