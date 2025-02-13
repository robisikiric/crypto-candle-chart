"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thickness = void 0;
/**
 * A class used for margins and padding in SciChart.js
 */
var Guard_1 = require("./Guard");
var Thickness = /** @class */ (function () {
    /**
     * Creates an instance of a Thickness object, with top, right, bottom and left
     * @param top
     * @param right
     * @param bottom
     * @param left
     */
    function Thickness(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    /**
     * Creates a Thickness (margin or padding) from string, e.g. "25 50 75 100". Order is top, right, bottom left. Same as in Css
     * @param str
     */
    Thickness.fromString = function (str) {
        Guard_1.Guard.notNull(str, "str");
        var elements = str.split(" ").map(function (s) { return parseFloat(s); });
        if (elements.length !== 4) {
            throw new Error("Expected string in the format '1 2 3 4' where values are top, right bottom and left");
        }
        return new Thickness(elements[0], elements[1], elements[2], elements[3]);
    };
    /**
     * Creates a Thickness (margin or padding) from a single value, e.g. 10, would return a thickness with top, right, bottom left = 10
     * @param value
     */
    Thickness.fromNumber = function (value) {
        return new Thickness(value, value, value, value);
    };
    /**
     * Returns whether two {@link Thickness} instances are equal or not
     * @example
     * const t1 = new Thickness(4,4,4,4);
     * const t2 = new Thickness.fromNumber(4);
     * console.log(Thickness.areEqual(t1, t2)); // True
     */
    Thickness.areEqual = function (first, second) {
        if (!first || !second)
            return false;
        return (first.top === second.top &&
            first.right === second.right &&
            first.bottom === second.bottom &&
            first.left === second.left);
    };
    /**
     * Returns the max of each side of 2 components in a new {@link Thickness} object
     * @param first
     * @param second
     * @example
     * const t1 = new Thickness(1,2,3,4);
     * const t2 = new Thickness(4,3,2,1);
     * console.log(Thickness.mergeMax(t1, t2));
     * // Thickness { top: 4, right: 3, bottom: 3, left: 4 }
     */
    Thickness.mergeMax = function (first, second) {
        var maxPadding = new Thickness(0, 0, 0, 0);
        maxPadding.top = Math.max(first.top, second.top);
        maxPadding.left = Math.max(first.left, second.left);
        maxPadding.bottom = Math.max(first.bottom, second.bottom);
        maxPadding.right = Math.max(first.right, second.right);
        return maxPadding;
    };
    return Thickness;
}());
exports.Thickness = Thickness;
