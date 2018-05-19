import React from "react";
import Header from '../Header.js';
import Footer from '../Footer.js';
import Menu from '../Menu.js';
import { Link } from 'react-router-dom'

export default () =>

	<div className="row" id="main" style={{ height: window.innerHeight}}>
		<div className="col-md-2 height100">
			<Menu />
		</div>
		<div className="col-md-10" id="content">
			<div className="container">
			<Header />
				<h3>Oups ! Cette page n'existe pas !</h3>
				<Link to="/">Retourner à la page d'accueil</Link>
			<hr />
			<Footer />
			</div>
		</div>
	</div>