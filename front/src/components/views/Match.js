import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';
import Background from '../../img/novelli.jpg';


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
            <div className="row">
                <div className="col-md-4 flexbox flex-column">
                    <h3>Equipe 1</h3>
                </div>
                <div className="col-md-4 flexbox flex-column">
                    <p className="versus">VS</p>
                    <button className="btn btn-primary">Créer un match</button>
                </div>
                <div className="col-md-4 flexbox flex-colomn">
                    <h3>Equipe 2</h3>
                </div>
            </div>
            <div className="row">
                <div className="input-group search">
                        <input type="text" className="form-control" placeholder="Rechercher..." />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button"><i className="fas fa-search"></i></button>
                        </span>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="flexbox flex-column player">
                            <div className="photo2">
                                <div style={{ backgroundImage: `url(${Background})` }}></div>
                            </div>
                            <h4>Jean-Christophe Novelli</h4>
                            <h5>@Noveldu93</h5>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="player"></div>
                    </div>
                    <div className="col-md-3">
                        <div className="player"></div>
                    </div>
                    <div className="col-md-3">
                        <div className="player"></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    );
  }
};

export default Match;
