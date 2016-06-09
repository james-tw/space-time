var React = require('react');

var mapHelpers = require('../utils/mapHelpers');





var Map = React.createClass({
    getDefaultProps:function(){
        return {
            width: 20,
            height: 20,
        }
    },
    componentWillMount: function() {
        this.setState({
            mapDOM: mapHelpers.getMapDOM(this.props.width, this.props.height, this.props.mapType)
        });
    },
    render: function() {
        return (
            <pre className="map">
                { this.state.mapDOM }
            </pre>
        );
    }

});


Map.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    mapType: React.PropTypes.string.isRequired
}

module.exports = Map;