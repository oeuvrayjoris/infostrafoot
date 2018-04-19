import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';

class Home extends Component {

  render() {
    return (

      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <Header />
            <h1>Accueil</h1>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <div className="section flexbox" id="s1">Section 1</div>
              </div>
              <div className="col-md-9">
                <div className="section flexbox" id="s2">Section 2</div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3">
                <div className="section flexbox" id="s3">Section 3</div>
              </div>
              <div className="col-md-9">
                <div className="section flexbox" id="s4">Section 4</div>
              </div>
            </div>
          </div>
          <section id="section1" />
        </div>
      </div>
    );
  }
};

export default Home;
