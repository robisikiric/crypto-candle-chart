"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zeroArray2D = void 0;
/**
 * @description creates a 2-dimensional array filled with zeros
 * @param dimension, an array containing the 2D dimensions [height, width] defined as a 2D array,
 * e.g. [3,2] creates an array 3 elements each with 2 elements, or [ [0, 0] , [0, 0], [0, 0] ]
 */
var zeroArray2D = function (dimensions) {
    if (!dimensions) {
        return undefined;
    }
    var array = [];
    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length === 1 ? 0 : (0, exports.zeroArray2D)(dimensions.slice(1)));
    }
    return array;
};
exports.zeroArray2D = zeroArray2D;
