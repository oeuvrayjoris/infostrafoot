import React, { Component } from 'react';
import ApiService from './ApiService';

export default function withAuth(AuthComponent)  {
   const Api = new ApiService('https://www.floriantorres.fr/infostrafootapi/public/');
    return class AuthWrapped extends Component {
	    constructor() {
		    super();
		    this.state = {
		        user: null
		    }
		}

		componentWillMount() {
		    if (!Api.loggedIn()) {
		        this.props.history.replace('/login')
		    }
		}

		render() {
	        return (
	            <AuthComponent />
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