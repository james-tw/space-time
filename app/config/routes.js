import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Main from '../components/Main';
import Home from '../components/Home';
import StarMap from '../components/StarMap';

var routes = (
    <Router history={ hashHistory }>
        <Route path="/" component={Main}>
            <IndexRoute component={Home} />
            <Route path="/starmap" component={StarMap} />
        </Route>
    </Router>
)

module.exports = routes;