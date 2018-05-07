// Importing Libraries
import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom'
import history from './history'
// Importing Components
import AuthService from './components/AuthService'
import App from './components/views/App'
import Login from './components/views/Login'
import SignUp from './components/views/SignUp'
import Profile from './components/views/Profile'
import Match from './components/views/Match'
import Comparator from './components/views/Comparator'
import Search from './components/views/Search'
//Importing styles
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

class Root extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: null
		}
	}

	render() {
		return(
			<Router history={history}>
				<Switch>
				  <Route exact path='/' render={(props) => <App {...props} user={this.state.user}/>} />
				  {routes.map( ({path, component: C }, index) => (
				  	<Route key={index} path={path} render={(props) => <C {...props} user={this.state.user}/>} 
				  	/> 
				  ))}
				</Switch>
		    </Router>
	    )
	}
}

export default Root