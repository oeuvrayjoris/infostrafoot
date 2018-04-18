import React, { Component } from 'react';
import './styles/sass/style.scss';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';

const App = () => (
	<div>
        <Header/>
        <Main/>
        <Footer/>
    </div>
)

export default App;
