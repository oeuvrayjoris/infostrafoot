// Importing Libraries
import React from 'react';
import { render } from 'react-dom'
// Importing Components
import AppRoutes from './Root';
import { unregister } from './registerServiceWorker';
// Importing styles
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './styles/css/style.css';

render((
	<AppRoutes />
), document.getElementById('root'));

unregister();
