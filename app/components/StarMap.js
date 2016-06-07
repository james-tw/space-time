var React = require('react');
var Map = require('../components/Map');

var StarMap = React.createClass({

    render: function() {
        return (
            <div>
                <Map width={20} height={20} mapType="circle" />
            </div>
        );
    }

});

module.exports = StarMap;