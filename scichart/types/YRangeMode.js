"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EYRangeMode = void 0;
/**
 * Enumeration constants to define how getWindowedYRange should behave
 */
var EYRangeMode;
(function (EYRangeMode) {
    /** Y Range will be calculated based on the visible points. (Default).  In some cases lines to points outside the range may escape the axis  */
    EYRangeMode["Visible"] = "Visible";
    /** Y Range will include the points either side of the visible set.
     * The series is guaranteed to be drawn within the axis bounds, but the range could be affected by extreme points just outside */
    EYRangeMode["Drawn"] = "Drawn";
})(EYRangeMode = exports.EYRangeMode || (exports.EYRangeMode = {}));
