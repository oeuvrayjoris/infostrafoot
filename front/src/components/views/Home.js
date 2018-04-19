import React, { Component } from 'react';
import '../../styles/sass/style.scss';
import Menu from '../Menu.js';
import Header from '../Header.js';
import AuthService from '../AuthService'
const Auth = new AuthService();

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
    }
    console.log(this.props.user)
  }

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/');
  }

  render() {
    return (

      <div className="row" id="main" style={{ height: window.innerHeight}}>
        <div className="col-md-2 height100">
           <Menu />
        </div>
        <div className="col-md-10" id="content">
          <div className="container">
            <Header handleLogout={this.handleLogout.bind(this)} user={this.props.user}/>
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
export default Home