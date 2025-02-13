"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAxisType = void 0;
/**
 * Enumeration constants to define the type of {@link AxisCore | Axis}
 */
var EAxisType;
(function (EAxisType) {
    /**
     * The Axis is a Category Axis. X-values are measured based on index, not data-value
     */
    EAxisType["CategoryAxis"] = "CategoryAxis";
    /**
     * The Axis is a Numeric value Axis. X-Values are measured based on value, not index
     */
    EAxisType["NumericAxis"] = "NumericAxis";
    /**
     * The Axis is a Logarithmic Numeric value Axis. X/Y Values are measured based on logN(value)
     */
    EAxisType["LogarithmicAxis"] = "LogarithmicAxis";
    /**
     * The Axis is a 3D Chart Numeric value Axis. X-Values are measured based on value, not index
     */
    EAxisType["NumericAxis3D"] = "NumericAxis3D";
    /**
     * The Axis is a Date / Time value Axis. X-Values are measured based on value, not index
     */
    EAxisType["DateTimeNumericAxis"] = "DateTimeNumericAxis";
})(EAxisType = exports.EAxisType || (exports.EAxisType = {}));
