var React = require('react');

import NavigationItem from '../components/NavigationItem';

function getNavItems (navItemsArray) {
    return navItemsArray.map( (item) => {
        if ( item.unlocked ) {
            return (
                <NavigationItem 
                    key={item.title}
                    path={item.path}
                    title={item.title} />
            )
        }
    })
}

var Navigation = React.createClass({
    
    render: function() {
        return (
            <ul>
                { getNavItems( this.props.navItems ) }
            </ul>
        );
    }

});


Navigation.propTypes = {
    navItems: React.PropTypes.array
}

module.exports = Navigation;