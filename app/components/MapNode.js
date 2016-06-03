var React = require('react');

var MapNode = React.createClass({

    render: function() {
        return (
            <span className="map__node">{this.props.nodeObj.icon}</span>
        );
    }

});

MapNode.propTypes = {
    nodeObj: React.PropTypes.object
}

module.exports = MapNode;