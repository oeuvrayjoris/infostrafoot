// Importing Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// Importing Styles
import '../../styles/sass/style.scss';
// Importing Components
import Menu from '../Menu.js';
import Header from '../Header.js';
import AuthService from '../AuthService';
import ApiService from '../ApiService'
import Background from '../../img/novelli.jpg';

const Auth = new AuthService();
const Api = new ApiService();

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: null,
      best_scorer : null
    }
  }

  handleLogout(){
    Auth.logout()
    //this.props.history.replace('/');
    this.setState({
      user: null
    }, console.log("Disconnected"))
    this.checkIfUserAuth()
  }

  componentDidMount() {
    Api.home()
      .then(result => this.setStats(result))  // Calls API and then setState with the result
  }

  setStats(result) {
    this.setState({
      best_scorer: result.best_scorers[0].username
    })
  }

  render() {
    return (
      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <Header handleLogout={this.handleLogout.bind(this)} user={this.state.user}/>
            <h1>Accueil</h1>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <div className="section flexbox flex-column" id="s1">
                    <i className="fas fa-trophy fa-3x"></i>
                    <h3>Meilleur buteur</h3>
                    <h5>{this.state.best_scorer}</h5>
                </div>
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
        </div>
      </div>
    );
  }
};

//export default withAuth(Home);

export default connect(state => state)(App);