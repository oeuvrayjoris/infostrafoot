// Importing Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// Importing Styles
import '../../styles/sass/style.scss';
// Importing Components
import Menu from '../Menu.js';
import Header from '../Header.js';
import AuthService from '../AuthService'
const Auth = new AuthService();

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: null
    }
    /*
    setTimeout(
      () => this.checkIfUserAuth()
      this.setState({
        user: "hello"
      })
    , 1000)*/
  }

  handleLogout(){
    Auth.logout()
    //this.props.history.replace('/');
    this.setState({
      user: null
    }, console.log("Disconnected"))
    this.checkIfUserAuth()
  }

  checkIfUserAuth() {
    try {
      const profile = Auth.getProfile()
      this.setState({
          user: profile
      }, () => console.log(this.state))
    }
    catch(err){
      console.log(err)
      this.setState({
          user: null
      }, () => console.log(this.state))
    }
  }


  componentWillMount() {
    this.checkIfUserAuth()
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
        </div>
      </div>
    );
  }
};

//export default withAuth(Home);

export default connect(state => state)(App);