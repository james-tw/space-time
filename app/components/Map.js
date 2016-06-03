var React = require('react');
var MapNode = require('../components/MapNode');

var nodeIndex = {
    dot: {
        icon: "‧"
    },
    star: {
        icon: "※"
    }
}


function rand(min,max) {
    return Math.random() * ( max - min + 1 ) + min;
}

Math.nrand = function() {
    var x1, x2, rad, y1;
    do {
        x1 = 2 * this.random() - 1;
        x2 = 2 * this.random() - 1;
        rad = x1 * x1 + x2 * x2;
    } while(rad >= 1 || rad == 0);
    var c = this.sqrt(-2 * Math.log(rad) / rad);
    return x1 * c;
};

function buildMapMatrix(width, height, mapType) {
    var mapType = mapType || 'circle';
    var heightArr = new Array(height).fill('');
    var widthArr = new Array(width).fill('');

    var center = [( (width-1) / 2 ),((height-1) / 2)];

    var matrix = heightArr.map( (row, rowIndex) => {
        return widthArr.map( (cell, cellIndex) => {
            var object;
            var distanceFromCenterY = Math.abs(rowIndex - center[1]);
            var distanceFromCenterX = Math.abs(cellIndex - center[0]);
            var distanceFromCenter = Math.sqrt(Math.pow(distanceFromCenterY, 2) + Math.pow(distanceFromCenterX, 2));
            // Based on the mapType, create an evenly distrubuted map, one with more stuff in the center, a ring, or whatever.
            if ( mapType === 'even' ) {
                object = Math.random() > 0.05 ? nodeIndex.dot : nodeIndex.star;
             // if ( Math.random() < 0.001 ) { object = "⍾" }
            }
            if ( mapType === 'centered' ) {
                // more likely when closer to center
                var xProbability = width * .05;
                var yProbability = height * .05;
                if (( rand( 0 , distanceFromCenterY ) < yProbability ) && ( rand( 0 , distanceFromCenterX ) < xProbability ) ) {
                    object = nodeIndex.star;
                } else { object = nodeIndex.dot }
            }
            if ( mapType === 'circle' ) {
                // more likely when ringRadius away from center point
                var ringThickness = 1.2; // 0 is perfect ring. 1 is tight. 5 is limit of ringy-ness.
                var ringRadius = height / 4; // If map is a circle
                if (Math.floor(Math.abs(Math.nrand() * ringThickness) + ringRadius ) === Math.floor(distanceFromCenter)) {
                    object = nodeIndex.star;
                } else { object = nodeIndex.dot }
            }
            if ( mapType === 'ring' ) {
                // like 'circle' but oblong if the map is not square.
                // DOESN"T WORK at the moment.
                var ringThickness = 1.5; // 1 is tight. 5 is limit of ringy-ness.
                var ringRadiusX = (width - 1) / 4;
                var ringRadiusY = (height - 1) / 4;
                if ((Math.floor(Math.abs(Math.nrand() * ringThickness) + ringRadiusX ) === Math.floor(distanceFromCenterX))) {
                    object = nodeIndex.star;
                } else { object = nodeIndex.dot }
            }
            // return {icon: "[" + rowIndex + "," + cellIndex + "]"};
            return object;
        })
    })
    return matrix;
}

function getMapDOM(width, height) {
    var mapMatrix = buildMapMatrix(width, height);
    return mapMatrix.map((row, rowIndex) => {
        return (
            <div className="map-row">
            {
               row.map((cell, cellIndex) => {
                   return ( <MapNode nodeObj={cell} key={"" + rowIndex + "," + cellIndex} /> ) /* TO DO: FIX MY KEY PROP */
               }) 
            }
            </div>
        )
    })
}



var Map = React.createClass({
    getDefaultProps:function(){
        return {
            width: 32,
            height: 16,
        }
    },
    render: function() {
        return (
            <pre className="map">
                { getMapDOM(this.props.width, this.props.height) }
            </pre>
        );
    }

});


Map.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
}

module.exports = Map;