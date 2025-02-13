"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = void 0;
function memoize(heavyCalculationFunction, equalityComparisonFunction) {
    var memoizedValue;
    var prevArgs;
    // relies on referential equality
    var defaultComparator = function (args, previousArgs) {
        return !args.some(function (value, paramIndex) { return value !== previousArgs[paramIndex]; });
    };
    var checkIsEqual = equalityComparisonFunction !== null && equalityComparisonFunction !== void 0 ? equalityComparisonFunction : defaultComparator;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isEqual = prevArgs && checkIsEqual(args, prevArgs);
        if (!prevArgs || !isEqual) {
            // Note: it only stores a shallow copy of the params
            prevArgs = args;
            memoizedValue = heavyCalculationFunction.apply(void 0, args);
        }
        return memoizedValue;
    };
}
exports.memoize = memoize;
