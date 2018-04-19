import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';


class Search extends Component {

  render() {
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
        <div className="input-group">
                <input type="text" className="form-control" placeholder="Rechercher..." />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button"><i className="fas fa-search"></i></button>
                </span>
            </div></div>
                <div className="col-md-9"></div>
            </div>
        </div>
        </div>
      </div>
    );
  }
};

export default Search;
