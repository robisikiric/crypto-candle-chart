"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberRange = void 0;
var isRealNumber_1 = require("../utils/isRealNumber");
var math_1 = require("../utils/math");
/**
 * Defines a number range with numeric min, max
 */
var NumberRange = /** @class */ (function () {
    function NumberRange(min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 10; }
        this.min = min;
        this.max = max;
    }
    /**
     * Returns a new {@link NumberRange} which is the union of two ranges
     * @remarks
     * E.g. if current range is [1,2] and input is [2,3] the result range will be [1,3]
     * @param range
     * @returns the new union range
     */
    NumberRange.prototype.union = function (range) {
        var newMin = Math.min(this.min, range.min);
        var newMax = Math.max(this.max, range.max);
        return new NumberRange(newMin, newMax);
    };
    /**
     * Clips a range to a min, max value
     * @remarks
     * E.g. if the current range is [1,5] and input is [2,6] then result will be [2,5]
     * @param range
     * @returns The new clipped range
     */
    NumberRange.prototype.clip = function (range) {
        var newMin = Math.max(this.min, range.min);
        var newMax = Math.min(this.max, range.max);
        return new NumberRange(newMin, newMax);
    };
    /**
     * Grows a range by a min and max factor
     * @remarks
     * If the current range is [5,10] and the input range is [0.1, 0.1] the current range will be
     * grown by 10%, so [4.5, 10.5]
     * @param range The grow factor
     */
    NumberRange.prototype.growBy = function (range) {
        var diff = this.max - this.min;
        // If min == max, expand around the mid line
        var min = this.min - range.min * (this.isZero() ? this.min : diff);
        var max = this.max + range.max * (this.isZero() ? this.max : diff);
        // Swap if min > max (occurs when mid line is negative)
        if (min > max) {
            var temp = min;
            min = max;
            max = temp;
        }
        // If still zero, then expand around the zero line
        // if (Math.abs(max - min) <= EPSILON && Math.abs(min) <= EPSILON) {
        //     min = -1.0;
        //     max = 1.0;
        // }
        return new NumberRange(min, max);
    };
    NumberRange.prototype.growByLog = function (range, logBase) {
        // If NegativeLogarithmicAxis, negate ranges
        var mult = this.min < 0 ? -1 : 1;
        var minExp = this.min !== 0 ? (0, math_1.logToBase)(Math.abs(this.min), logBase) : 0;
        var maxExp = this.max !== 0 ? (0, math_1.logToBase)(Math.abs(this.max), logBase) : 0;
        var expDiff = maxExp - minExp;
        var minExpDelta = expDiff * range.min;
        var maxExpDelta = expDiff * range.max;
        var newMin = mult * (this.min !== 0 ? Math.pow(logBase, minExp - minExpDelta) : 0);
        var newMax = mult * (this.max !== 0 ? Math.pow(logBase, maxExp + maxExpDelta) : 0);
        if (newMin > newMax) {
            var t = newMax;
            newMax = newMin;
            newMin = t;
        }
        return new NumberRange(newMin, newMax);
    };
    /**
     * Returns true if the range is defined (is a real number, not NaN, not infinite, and not undefined)
     */
    NumberRange.prototype.isDefined = function () {
        return (0, isRealNumber_1.isRealNumber)(this.max) && (0, isRealNumber_1.isRealNumber)(this.min);
    };
    /**
     * Returns true if the range equals another by value
     * @param other
     */
    NumberRange.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        return other.min === this.min && other.max === this.max;
    };
    /**
     * Returns a string representation of a {@link NumberRange} for easy debugging
     */
    NumberRange.prototype.toString = function () {
        return "NumberRange (".concat(this.min, ", ").concat(this.max, ")");
    };
    Object.defineProperty(NumberRange.prototype, "diff", {
        /**
         * Returns a difference between max and min
         */
        get: function () {
            return this.max - this.min;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns true if the range min === range max
     */
    NumberRange.prototype.isZero = function () {
        return this.min === this.max;
    };
    NumberRange.areEqual = function (range1, range2) {
        if (range1 === range2)
            return true;
        if (range1 && !range2 || !range1 && range2)
            return false;
        return range2.min === range1.min && range2.max === range1.max;
    };
    /**
     * Turns a { min, max } object into a {@link NumberRange}, most helpful for JSON deserialization
    */
    NumberRange.hydrate = function (range) {
        if (range && !("growBy" in range)) {
            return new NumberRange(range.min, range.max);
        }
        return range;
    };
    return NumberRange;
}());
exports.NumberRange = NumberRange;
