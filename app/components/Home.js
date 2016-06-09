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
                            disabled={!this.props.isEnabled} >
                            Buy: {this.props.costString}
                        </button>
                    )
                }
            </div>
        )
        
    }
})

var Home = React.createClass({
    
    checkCanAfford(item) {
        // Get item cost
        var cost = this.props.upgrades[item].cost
        var canAfford = true;
        // For each item cost type

        Object.keys(cost).forEach( costType => {
            var price = cost[costType];
            // Check cost against current resources of that type.
            if ( price > this.props.resources[costType] ) {
                canAfford = false;
            }
        })
        // return boolean
        return canAfford;
    },
    getCostString(item) {
        var cashCost = this.props.upgrades[item].cost.cash;
        var researchCost = this.props.upgrades[item].cost.research;

        return ( cashCost ? cashCost + " Cash " : "" ) + (cashCost && researchCost ? " + " : "") + ( researchCost ? researchCost + " Research" : "");
    },
    render: function() {
        return (
            <div>
                <p>Year: {Math.floor(this.props.year)}</p>
                <p>Cash: {Math.floor(this.props.resources.cash)}</p>
                <p>Research: {Math.floor(this.props.resources.research)}</p>                
                
                { Object.keys(this.props.upgrades).map( upgradeName => {
                    var upgrade = this.props.upgrades[upgradeName]
                    if ( upgrade.unlocked ) {
                        return ( 
                            <PurchaseButton 
                                upgrade={upgrade}
                                upgradeName={upgradeName}
                                handleBuy={this.props.buy}
                                isEnabled={this.checkCanAfford(upgradeName)}
                                canBuy={upgrade.count < upgrade.max}
                                costString={this.getCostString(upgradeName)}
                                key={upgradeName} />
                        )
                    }
                }) }
            </div>
        );
    }

});

module.exports = Home;