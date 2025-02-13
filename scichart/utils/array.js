"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendRangeFifo = exports.makeIncArray = exports.isArraySorted = exports.arrayRemove = exports.areArraysEqual = exports.countUnique = exports.getUniqueValues = void 0;
function getUniqueValues(array) {
    var onlyUnique = function (value, index, self) {
        if (value === undefined || value === null)
            return false;
        return self.indexOf(value) === index;
    };
    return array.filter(onlyUnique);
}
exports.getUniqueValues = getUniqueValues;
function countUnique(iterable) {
    return new Set(iterable).size;
}
exports.countUnique = countUnique;
var areArraysEqual = function (leftArray, rightArray) {
    if (leftArray === rightArray) {
        return true;
    }
    if ((leftArray === null || leftArray === void 0 ? void 0 : leftArray.length) !== (rightArray === null || rightArray === void 0 ? void 0 : rightArray.length)) {
        return false;
    }
    if (leftArray && rightArray) {
        for (var i = 0; i < leftArray.length; ++i) {
            if (leftArray[i] !== rightArray[i]) {
                return false;
            }
        }
    }
    return true;
};
exports.areArraysEqual = areArraysEqual;
function arrayRemove(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === item) {
            array.splice(i, 1);
            break;
        }
    }
    return array;
}
exports.arrayRemove = arrayRemove;
/**
 * returns true if the array is sorted
 * @param arr The array
 * @param ascending If True checks for sorted ascending, if False for descending
 */
function isArraySorted(arr, ascending) {
    if (ascending === void 0) { ascending = true; }
    var sorted = true;
    var checkUnsortedFn = ascending ? function (i) { return arr[i] > arr[i + 1]; } : function (i) { return arr[i] < arr[i + 1]; };
    for (var i = 0; i < arr.length - 1; i++) {
        if (checkUnsortedFn(i)) {
            sorted = false;
            break;
        }
    }
    return sorted;
}
exports.isArraySorted = isArraySorted;
/**
 * Helper method for generating an array of a given length, where the values are the indicies
 * An optional multiplier and map function can be applied.
 * @param length
 * @param multiplier
 * @param map
 * @returns
 */
function makeIncArray(length, multiplier, map) {
    var arr = Array.from(Array(length)).map(function (_, i) { return (multiplier !== null && multiplier !== void 0 ? multiplier : 1) * i; });
    if (map) {
        return arr.map(map);
    }
    else {
        return arr;
    }
}
exports.makeIncArray = makeIncArray;
/**
 * Helper function to append an array to a target array, treating the target as a circular buffer
 * @param source
 * @param target
 * @param fifoCapacity
 * @param startIndex
 */
function appendRangeFifo(source, target, fifoCapacity, startIndex) {
    var targetSize = target.length;
    var length = source.length;
    //console.log("s,t ", source, target);
    if (fifoCapacity >= targetSize + length) {
        // Space to append all data.  Use normal method
        target.length += length;
        // merge new values into the collection
        for (var i = 0; i < length; ++i) {
            target[targetSize + i] = source[i];
        }
    }
    else if (length > fifoCapacity) {
        // new data is larger than buffer.  Replace buffer with end of data
        var dataIndex = length - fifoCapacity;
        var dataThatWillFit = source.slice(dataIndex);
        target = dataThatWillFit;
    }
    else if (fifoCapacity > targetSize) {
        // buffer not full yet, but new data will overflow
        var remainingCap = fifoCapacity - targetSize;
        target.length = fifoCapacity;
        for (var i = 0; i < length; ++i) {
            if (i < remainingCap) {
                target[targetSize + i] = source[i];
            }
            else {
                target[remainingCap - i] = source[i];
            }
        }
    }
    else {
        // buffer already full
        var remainingCap = length;
        if (startIndex + length > fifoCapacity) {
            // need to do two writes
            remainingCap = fifoCapacity - startIndex;
        }
        for (var i = 0; i < length; ++i) {
            if (i < remainingCap) {
                target[startIndex + i] = source[i];
            }
            else {
                target[remainingCap - i] = source[i];
            }
        }
    }
    //console.log("t: ", target);
}
exports.appendRangeFifo = appendRangeFifo;
