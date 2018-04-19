import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent)  {
   const Auth = new AuthService('https://www.floriantorres.fr/infostrafootapi/public/');
    return class AuthWrapped extends Component {
	    constructor() {
		    super();
		    this.state = {
		        user: null
		    }
		}

		componentWillMount() {
		    if (!Auth.loggedIn()) {
		        this.props.history.replace('/login')
		    }
		    else {
		        try {
		            const profile = Auth.getProfile()
		            this.setState({
		                user: profile
		            })
		        }
		        catch(err){
		        	console.log(err)
		            Auth.logout()
		            this.props.history.replace('/login')
		        }
		    }
		}

		render() {
	        return (
	            <AuthComponent history={this.props.history} user={this.state.user} />
	        )
		/*
		    if (this.state.user) {
		        return (
		            <AuthComponent history={this.props.history} user={this.state.user} />
		        )
		    }
		    else {
		        //return null
		        return (
		            <AuthComponent history={this.props.history} user={this.state.user} />
		        )
		    }
		*/
	}
    }
}