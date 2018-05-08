import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';

import Player from '../Player'
import ItemTypes from '../ItemTypes'
import ApiService from '../ApiService'

const Api = new ApiService();

class Search extends Component {  

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      players: []
    }

    this.setPlayers = this.setPlayers.bind(this)
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

  // Handle the changed values on the form
  handleChange = e => {
    const field = e.target.value;
    this.setState({
      search: field
    });
  };

  // Handle the submit event
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.search)
  }

  render() {

    const players = this.state.players

    return (

      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <Header />
            <h1>Rechercher</h1>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <form className="input-group">
                    <input type="text" className="form-control"name="search" placeholder="Rechercher..." value={this.state.value} onChange={e => this.handleChange(e)} />
                    <span className="input-group-btn">
                        <button 
                        type="submit" 
                        className="btn btn-default" 
                        onClick={e => this.handleSubmit(e)}
                        ><i className="fas fa-search"></i></button>
                    </span>
                </form>
              </div>
              <div className="row">
                {players.map(({ id, firstname, lastname, username, display }, index) =>  {
                  /*
                  return (
                    <Player
                        id={id}
                        firstname={firstname}
                        lastname={lastname}
                        username={username}
                        display={display}
                        key={id}
                    />
                  )
                  */
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Search;
