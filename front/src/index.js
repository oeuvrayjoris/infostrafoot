// Importing Libraries
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
// Importing Components
import AppRoutes from './Root';
import { unregister } from './registerServiceWorker';
// Importing styles
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './styles/css/style.css';

render((
	<Provider store={store}>
	    <AppRoutes />
  </Provider>
), document.getElementById('root'));

unregister();
