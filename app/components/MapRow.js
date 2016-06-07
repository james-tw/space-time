var React = require('react');

var MapNode = require('../components/MapNode');

var MapRow = React.createClass({

    render: function() {
        return (
            <div className="map-row">
            {
               this.props.cells.map((cell, cellIndex) => {
                   return ( <MapNode nodeObj={cell} key={"" + this.key + "," + cellIndex} /> ) /* TO DO: Check this key prop */
               }) 
            }
            </div>
        );
    }

});

module.exports = MapRow;