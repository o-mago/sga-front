import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import Update from './Update';
import Documentation from './Documentation';
import * as serviceWorker from './serviceWorker';
import './web.config';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from './components/Login'
import AuthContext from './context/Auth'
import Main from './Main'

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
