var React = require('react');
var Map = require('../components/Map');

var Home = React.createClass({

    render: function() {
        return (
            <div>
                <Map width={20} height={20}/>
            </div>
        );
    }

});

module.exports = Home;