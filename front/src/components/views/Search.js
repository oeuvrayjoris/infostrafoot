import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';

class Search extends Component {

  render() {
    return (

      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <h1>Rechercher</h1>
            <hr />
        </div>
        </div>
      </div>
    );
  }
};

export default Search;
