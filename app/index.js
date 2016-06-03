import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import routes from './config/routes';

ReactDOM.render(
    routes,
    document.getElementById('app'));