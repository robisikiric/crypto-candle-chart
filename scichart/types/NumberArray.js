"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subArray = exports.isNumberArray = exports.isTypedArray = void 0;
function isTypedArray(a) {
    return a instanceof Float64Array;
}
exports.isTypedArray = isTypedArray;
function isNumberArray(a) {
    // Check type is an array, and first element is number
    return Array.isArray(a) && (a.length > 0 ? typeof a[0] === "number" : true);
}
exports.isNumberArray = isNumberArray;
function subArray(array, startIndex, endIndex) {
    if (isTypedArray(array)) {
        // We can define a view
        return array.subarray(startIndex, endIndex);
    }
    else {
        // Slice is faster than new Float64Array(array).subarray
        return array.slice(startIndex, endIndex);
    }
}
exports.subArray = subArray;
