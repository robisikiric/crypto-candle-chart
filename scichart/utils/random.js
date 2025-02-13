"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInRange = void 0;
/**
 * Return random number in range [min, max]
 * @param min
 * @param max
 * @param decimalPlaces
 */
var getRandomInRange = function (min, max, decimalPlaces) {
    var rand = Math.random();
    var resultInRange = min + rand * (max - min);
    return parseInt((resultInRange * Math.pow(10, decimalPlaces)).toFixed(decimalPlaces), 10) / Math.pow(10, decimalPlaces);
};
exports.getRandomInRange = getRandomInRange;
