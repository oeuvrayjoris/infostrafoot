import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Team from '../Team'
import Player from '../Player'

class Match extends Component {

  render() {
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
            <DragDropContextProvider backend={HTML5Backend}>
				<div>
					<div className="row">
				        <Team name="Equipe 1" />
                        <div className="col-md-4 flexbox flex-column">
                            <p className="versus">VS</p>
                            <button className="btn btn-primary">Créer un match</button>
                        </div>
				        <Team name="Equipe 2" />
					</div>
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                            <div className="input-group search">
                                <input type="text" className="form-control" placeholder="Rechercher un joueur..." />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button"><i className="fas fa-search"></i></button>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-9"></div>
                    </div>
					<div className="row">
						<Player prenom="Joris" pseudo="jojo" />
						<Player prenom="Jordan" pseudo="legamin" />
						<Player prenom="David" pseudo="levacancier" />
					</div>
				</div>
			</DragDropContextProvider>
        </div>
        </div>
      </div>
    );
  }
};

export default Match;
