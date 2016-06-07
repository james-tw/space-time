var React = require('react');
import update from 'react-addons-update';

var PurchaseButton = React.createClass({
    render: function () {
        return (
            <div>
                <span>{this.props.upgrade.name} - {this.props.upgrade.description} </span>
                <span>({this.props.upgrade.count} of {this.props.upgrade.max})</span>
                { this.props.canBuy && 
                    (
                        <button 
                            onClick={this.props.handleBuy.bind(null, this.props.upgradeName)}
                            disabled={!this.props.isEnabled}
                             >
                            Buy: {this.props.costString}
                        </button>
                    )
                }
               
            </div>
        )
        
    }
})

// for each upgrade
// count
// max
// cost (cash)
// cost (research)
// callback
// Name
// Description


var Home = React.createClass({
    getInitialState: function() {
        return {
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
    checkCanAfford(item) {
        // Get item cost
        var cost = this.state.upgrades[item].cost
        var canAfford = true;
        // For each item cost type

        Object.keys(cost).forEach( costType => {
            var price = cost[costType];
            // Check cost against current resources of that type.
            if ( price > this.state.resources[costType] ) {
                canAfford = false;
            }
        })
        // return boolean
        return canAfford;
    },
    getCostString(item) {
        var cashCost = this.state.upgrades[item].cost.cash;
        var researchCost = this.state.upgrades[item].cost.research;

        return ( cashCost ? cashCost + " Cash " : "" ) + (cashCost && researchCost ? " + " : "") + ( researchCost ? researchCost + " Research" : "")
    },
    render: function() {
        return (
            <div>
                <p>Year: {Math.floor(this.state.year)}</p>
                <p>Cash: {Math.floor(this.state.resources.cash)}</p>
                <p>Research: {Math.floor(this.state.resources.research)}</p>                
                
                { Object.keys(this.state.upgrades).map( upgradeName => {
                    var upgrade = this.state.upgrades[upgradeName]
                    if ( upgrade.unlocked ) {
                        return ( 
                            <PurchaseButton 
                                upgrade={upgrade}
                                upgradeName={upgradeName}
                                handleBuy={this.buy}
                                isEnabled={this.checkCanAfford(upgradeName)}
                                canBuy={upgrade.count < upgrade.max}
                                costString={this.getCostString(upgradeName)}/>
                        )
                    }
                }) }
            </div>
        );
    }

});

module.exports = Home;