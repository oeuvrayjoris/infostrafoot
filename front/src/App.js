import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import AuthService from './components/AuthService'
import Home from './components/views/Home'
import Login from './components/views/Login'
import SignUp from './components/views/SignUp'
import Profile from './components/views/Profile'
import Match from './components/views/Match'
import Comparator from './components/views/Comparator'
import Search from './components/views/Search'
import './styles/sass/style.scss';


const routes = [
	{
		path: '/login',
		component: Login
	},
	{
		path: '/signup',
		component: SignUp
	},
	{
		path: '/profile',
		component: Profile
	},
	{
		path: '/match',
		component: Match
	},
	{
		path: '/comparator',
		component: Comparator
	},
	{
		path: '/search',
		component: Search
	}
]

const Auth = new AuthService();

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: null
		}
	}

	render() {
		return(
			<div>
				<Switch>
				  <Route exact path='/' render={(props) => <Home {...props} user={this.state.user}/>} />
				  {routes.map( ({path, component: C }, index) => (
				  	<Route key={index} path={path} render={(props) => <C {...props} user={this.state.user}/>} 
				  	/> 
				  ))}
				</Switch>
		    </div>
	    )
	}
}

export default App;
