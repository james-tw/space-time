import React from 'react';
var _ = require('lodash');
var MapRow = require('../components/MapRow');
var randomHelpers = require('../utils/randomHelpers');



var nodeIndex = {
    dot: {
        icon: "‧"
    },
    star: {
        icon: "※"
    },
    blackHole: {
        icon: "X"
    }
}


function buildEmptyMatrix(width, height) {
    var heightArr = new Array(height).fill('');
    var widthArr = new Array(width).fill('');

    return heightArr.map( () => {
        return widthArr.map( () => {
            return {};
        })
    })
}


function applyMapLayer(existingMatrix, item, shape, itemLimit, shouldOverwrite, callback) {
    var height = existingMatrix.length;
    var width = existingMatrix[0].length;
    var center = [( (width-1) / 2 ),((height-1) / 2)];

    var newObjects = [];

    var matrix = existingMatrix.map( (row, rowIndex) => {
        return row.map( (cell, cellIndex) => {
            // If shouldOverwrite is false and cell contains something, skip this cell.
            if ( !shouldOverwrite && (Object.keys(obj).length > 0)) { return cell }

            var object = cell;

            var distanceFromCenterY = Math.abs(rowIndex - center[1]);
            var distanceFromCenterX = Math.abs(cellIndex - center[0]);
            var distanceFromCenter = Math.sqrt(Math.pow(distanceFromCenterY, 2) + Math.pow(distanceFromCenterX, 2));

            // Based on the shape, create an evenly distrubuted map, one with more stuff in the center, a ring, or whatever.
            if ( shape === 'even' ) {
                if (Math.random() < 0.15) {
                    object = nodeIndex[item];
                } 
            }
            if ( shape === 'centered' ) {
                // more likely when closer to center
                var xProbability = width * .05;
                var yProbability = height * .05;
                if (( randomHelpers.rand( 0 , distanceFromCenterY ) < yProbability ) && ( randomHelpers.rand( 0 , distanceFromCenterX ) < xProbability ) ) {
                    object = nodeIndex[item];
                }
            }
            if ( shape === 'anticentered' ) {
                // more likely when farther from center (in the corners)
                var xProbability = width * .25;
                var yProbability = height * .25;
                if (( randomHelpers.rand( 0 , distanceFromCenterY ) > yProbability ) && ( randomHelpers.rand( 0 , distanceFromCenterX ) > xProbability ) ) {
                    object = nodeIndex[item];
                }
            }
            if ( shape === 'circle' ) {
                // more likely when ringRadius away from center point
                var ringThickness = 2; // 0 is perfect ring. 1 is tight. 5 is limit of ringy-ness.
                var ringRadius = height / 4; // If map is a circle
                if (Math.floor(Math.abs(randomHelpers.nrand() * ringThickness) + ringRadius ) === Math.floor(distanceFromCenter)) {
                    object = nodeIndex[item];
                }
            }
            // if ( shape === 'ring' ) {
            //     // like 'circle' but oblong if the map is not square.
            //     // DOESN"T WORK at the moment.
            //     var ringThickness = 1.5; // 1 is tight. 5 is limit of ringy-ness.
            //     var ringRadiusX = (width - 1) / 4;
            //     var ringRadiusY = (height - 1) / 4;
            //     if ((Math.floor(Math.abs(randomHelpers.nrand() * ringThickness) + ringRadiusX ) === Math.floor(distanceFromCenterX))) {
            //         object = nodeIndex[item];
            //     }
            // }

            // return {icon: "[" + rowIndex + "," + cellIndex + "]"};

            // If a new object was placed in this cell, store it in the newObjects array.
            if ( !_.isEqual(object, cell) ) {
                newObjects.push({ row: rowIndex, cell: cellIndex });
            }

            return object;
        });
    });

    var shuffledObjects = randomHelpers.shuffleArray(newObjects);
    var listOfObjectsToDelete = shuffledObjects.splice(itemLimit);

    var limitedMatrix = _.clone(matrix);
    // For each object to delete, find it in the matrix and set it to {}
    listOfObjectsToDelete.forEach( (object) => {
        limitedMatrix[object.row][object.cell] = {};
    });


    return callback(limitedMatrix);
}

export function buildMapMatrix(width, height, mapType, density ) {
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
            }
            if ( mapType === 'centered' ) {
                // more likely when closer to center
                var xProbability = width * .05;
                var yProbability = height * .05;
                if (( randomHelpers.rand( 0 , distanceFromCenterY ) < yProbability ) && ( randomHelpers.rand( 0 , distanceFromCenterX ) < xProbability ) ) {
                    object = nodeIndex.star;
                } else { object = nodeIndex.dot }
            }
            if ( mapType === 'anticentered' ) {
                // more likely when farther from center (in the corners)
                var xProbability = width * .25;
                var yProbability = height * .25;
                if (( randomHelpers.rand( 0 , distanceFromCenterY ) > yProbability ) && ( randomHelpers.rand( 0 , distanceFromCenterX ) > xProbability ) ) {
                    object = nodeIndex.star;
                } else { object = nodeIndex.dot }
            }
            if ( mapType === 'circle' ) {
                // more likely when ringRadius away from center point
                var ringThickness = 2; // 0 is perfect ring. 1 is tight. 5 is limit of ringy-ness.
                var ringRadius = height / 4; // If map is a circle
                if (Math.floor(Math.abs(randomHelpers.nrand() * ringThickness) + ringRadius ) === Math.floor(distanceFromCenter)) {
                    object = nodeIndex.star;
                } else { object = nodeIndex.dot }
            }
            if ( mapType === 'ring' ) {
                // like 'circle' but oblong if the map is not square.
                // DOESN"T WORK at the moment.
                var ringThickness = 1.5; // 1 is tight. 5 is limit of ringy-ness.
                var ringRadiusX = (width - 1) / 4;
                var ringRadiusY = (height - 1) / 4;
                if ((Math.floor(Math.abs(randomHelpers.nrand() * ringThickness) + ringRadiusX ) === Math.floor(distanceFromCenterX))) {
                    object = nodeIndex.star;
                } else { object = nodeIndex.dot }
            }
            // return {icon: "[" + rowIndex + "," + cellIndex + "]"};
            return object;
        })
    })
    return matrix;
}

export function getMapDOM(width, height, mapType) {
    // var mapMatrix = buildMapMatrix(width, height, mapType);
    var mapMatrix = buildUniverse();
    return mapMatrix.map((row, rowIndex) => {
        return (
            <MapRow key={'row' + rowIndex} cells={row} />
        )
    })
}


export function buildUniverse () {
    // make empty matrix based on size.
    var emptyMatrix = buildEmptyMatrix(31, 21);

    // // TO DO: Set the center point to HOME galaxy

    return applyMapLayer(emptyMatrix, 'star', 'even', 50, true, (matrix) => {
        return applyMapLayer(matrix, 'blackHole', 'anticentered', 5, true, (matrix) => {
            return matrix;
        });
    });
}

