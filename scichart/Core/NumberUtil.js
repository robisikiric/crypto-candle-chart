"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberUtil = void 0;
/**
 * Numeric functions and number helpers
 */
var NumberUtil = /** @class */ (function () {
    function NumberUtil() {
    }
    /**
     * Constrain a value to a minimum and maximum (if outside bounds, clip to bounds
     * @param value
     * @param min
     * @param max
     */
    NumberUtil.constrain = function (value, min, max) {
        return Math.max(Math.min(value, max), min);
    };
    return NumberUtil;
}());
exports.NumberUtil = NumberUtil;
