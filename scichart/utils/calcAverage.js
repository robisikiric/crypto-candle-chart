"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcAverageForArray = exports.calcAverageForDoubleVector = void 0;
/**
 * @description Calculates average for DoubleVector
 * @param doubleVector
 * @param averageNum - number of values to respect for the average
 * @param index - index of the latest value to include, by default equals to length-1 of DoubleVector
 */
var calcAverageForDoubleVector = function (doubleVector, averageNum, index) {
    var length = doubleVector.size();
    var innerIndex = index !== null && index !== void 0 ? index : length - 1;
    if (innerIndex >= length || innerIndex < 0) {
        throw Error("index should be in range [0, length-1]");
    }
    if (innerIndex + 1 < averageNum) {
        return NaN;
    }
    var movingAverage = 0;
    for (var i = innerIndex + 1 - averageNum; i < innerIndex + 1; i++) {
        movingAverage += doubleVector.get(i);
    }
    movingAverage /= averageNum;
    return movingAverage;
};
exports.calcAverageForDoubleVector = calcAverageForDoubleVector;
var calcAverageForArray = function (ar, averageNum, index) {
    var length = ar.length;
    var innerIndex = index !== null && index !== void 0 ? index : length - 1;
    if (innerIndex >= length || innerIndex < 0) {
        throw Error("index should be in range [0, length-1]");
    }
    if (innerIndex + 1 < averageNum) {
        return NaN;
    }
    var movingAverage = 0;
    for (var i = innerIndex + 1 - averageNum; i < innerIndex + 1; i++) {
        movingAverage += ar[i];
    }
    movingAverage /= averageNum;
    return movingAverage;
};
exports.calcAverageForArray = calcAverageForArray;
