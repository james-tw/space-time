import React from 'react';
import update from 'react-addons-update';

import Navigation from '../components/Navigation';
var mapHelpers = require('../utils/mapHelpers');

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
            ],
            year: 0,
            resources: {
                cash: 0,
                research: 0
            },
            upgrades: {
                institute: {
                    unlocked: true,
                    count: 0,
                    max: 3,
                    cost: {
                        cash: 50,
                        research: 0
                    },
                    callback: function () {
                        console.log('Just bought an institute.');
                        
                        // This seems like the wrong way to set state, but it works...
                        this.state.upgrades.institute.cost.cash *= 2;
                        if ( this.state.upgrades.institute.count > 1 ) {
                            this.state.upgrades.robotics.unlocked = true;
                        }
                        
                    },
                    name: "Research Insititute",
                    description: "An institute of higher learning provides additional research."
                },
                robotics: {
                    unlocked: false,
                    count: 0,
                    max: 1,
                    cost: {
                        cash: 25,
                        research: 50
                    },
                    callback: function () {
                        console.log('Just started selling robotics.')
                        // Unlock scanners
                    },
                    name: "Robotics Program",
                    description: "Sell robotics innovations for cash. Allows you to build more advanced machinery."
                }
            },
            scannable: {
                planet: true,
                moon: true,
                comet: true,
                star: true,
                galaxy: true
            }
        };
    },
    componentDidMount: function() {
        var tick = setInterval( () => {
            // Increment progress, resources, and time

            var newState = update(this.state, {
                year: { $set: this.state.year + (1/12) },
                resources: {
                    cash: { $set: this.state.resources.cash + 1
                                                            + (this.state.upgrades.robotics.count * ( 0.2 ))
                    },
                    research: { $set: this.state.resources.research + (this.state.upgrades.institute.count * ( 0.1 )) }
                }
            })

            this.setState(newState);
        }, 100)
    },
    buy(item) {
        // Get item cost
        var cost = this.state.upgrades[item].cost

        // Decrease item cost on 'resource' table
        var newState = update(this.state, {
            resources: {
                cash: { $set: this.state.resources.cash - cost.cash },
                research: { $set: this.state.resources.research - cost.research }
            }
        });
        // Increase number purchased on 'upgrades' table
        newState.upgrades[item].count += 1;
        // Call callback associated with purchase.
        this.setState(newState, this.state.upgrades[item].callback.call(this));
    },
    render: function() {
        return (
            <div className="main-container">
                <Navigation navItems={this.state.navItems} />
                {/* Maybe check if this.props.children is home or map, then decide which props to pass. */}
                {/* At some point, need to store map matrices in state. Also need to implement "Check to see if there is a map already built. If so, use it." */}
                {React.cloneElement(this.props.children, 
                    { 
                        year: this.state.year,
                        resources: this.state.resources,
                        upgrades: this.state.upgrades,
                        buy: this.buy
                    }
                )}
            </div>
        );
    }

});

module.exports = Main;