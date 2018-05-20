import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';
import Footer from '../Footer.js';

class Comparator extends Component {

  render() {
    return (
      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <Header />
            <h1>Comparateur</h1>
            <hr />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
};

export default Comparator;
