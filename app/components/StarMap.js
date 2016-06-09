var React = require('react');
var Map = require('../components/Map');

var StarMap = React.createClass({

    render: function() {
        return (
            <div>
                <Map width={31} height={21} mapType="centered" />
            </div>
        );
    }

});

module.exports = StarMap;