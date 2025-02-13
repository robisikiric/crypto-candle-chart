"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testHasExcluded = exports.getIncludedAxis = void 0;
var getIncludedAxis = function (allAxes, axisMap) {
    if (axisMap.size === 0) {
        return allAxes;
    }
    if ((0, exports.testHasExcluded)(axisMap)) {
        return allAxes.filter(function (axis) { return axisMap.get(axis.id) !== false; });
    }
    return allAxes.filter(function (axis) { return axisMap.get(axis.id) === true; });
};
exports.getIncludedAxis = getIncludedAxis;
var testHasExcluded = function (axisMap) {
    var hasExcluded = false;
    axisMap.forEach(function (value) {
        if (value === false) {
            hasExcluded = true;
        }
    });
    return hasExcluded;
};
exports.testHasExcluded = testHasExcluded;
