import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';


class Search extends Component {  

  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  // Handle the changed values on the form
  handleChange = e => {
    const field = e.target.value;
    const name = e.target.name
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
                <input type="text" className="form-control"name="search" placeholder="Rechercher..." value={this.state.value} onChange={e => this.handleChange(e)}/>
                <span className="input-group-btn">
                    <input 
                    type="submit" 
                    className="btn btn-default" 
                    onClick={e => this.handleSubmit(e)}
                    /><i className="fas fa-search"></i>
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
