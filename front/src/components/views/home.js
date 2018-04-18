import React, { Component } from 'react';
import logo from '../../img/logo.png';
import '../../styles/sass/style.scss';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Menu from '../Menu.js';

class Home extends Component {

  render() {
    return (

      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
            <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <h1>Accueil</h1>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <div className="section" id="s1" />
              </div>
              <div className="col-md-9">
                <div className="section" id="s2" />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3">
                <div className="section" id="s3" />
              </div>
              <div className="col-md-9">
                <div className="section" id="s4" />
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
