import React from 'react';


import Navigation from '../components/Navigation';

require('../sass/main.scss');

var Main = React.createClass({
    getInitialState: function() {
        return {
            navItems : [
                {
                    'title': 'Home',
                    'path': '/',
                    'unlocked': true
                },
                {
                    'title': 'Star Map',
                    'path': '/starmap',
                    'unlocked': true
                },
                {
                    'title': 'Elements',
                    'path': '/elements',
                    'unlocked': false
                }
            ]
        };
    },  
    render: function() {
        return (
            <div className="main-container">
                <Navigation navItems={this.state.navItems} />
                {this.props.children}
            </div>
        );
    }

});

module.exports = Main;