// Importing Libraries
import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
// Importing Components
import App from './components/views/App'
import Login from './components/views/Login'
import SignUp from './components/views/SignUp'
import Profile from './components/views/Profile'
import Match from './components/views/Match'
import MatchRunning from './components/views/MatchRunning'
import Comparator from './components/views/Comparator'
import NotFound from './components/views/NotFound'
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
		path: '/matchrunning',
		component: MatchRunning
	},
	{
		path: '/comparator',
		component: Comparator
	}
]

class Root extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: null
		}
	}

	render() {
		return(
			<BrowserRouter basename="/infostrafoot">
				<Switch>
				  <Route exact path='/' render={(props) => <App {...props} user={this.state.user}/>} />
				  {routes.map( ({path, component: C }, index) => (
				  	<Route key={index} path={path} render={(props) => <C {...props} user={this.state.user}/>} 
				  	/> 
				  ))}
				  <Route component={NotFound}/>
				</Switch>
		    </BrowserRouter>
	    )
	}
}

export default Root