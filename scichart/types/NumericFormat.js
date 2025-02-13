"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENumericFormat = void 0;
/**
 * Enumeration constants for standard formatting strings
 */
var ENumericFormat;
(function (ENumericFormat) {
    /**
     * No format, return the string representation unchanged
     */
    ENumericFormat["NoFormat"] = "NoFormat";
    /**
     * Format to a specified number of decimal places
     */
    ENumericFormat["Decimal"] = "Decimal";
    /**
     * Format to a specified number of significant figures
     */
    ENumericFormat["SignificantFigures"] = "SignificantFigures";
    /**
     * Format as a date in format DD/MM/YYYY
     */
    ENumericFormat["Date_DDMMYYYY"] = "Date_DDMMYYYY";
    /**
     * Format as a date in format DD/MM/YY
     */
    ENumericFormat["Date_DDMMYY"] = "Date_DDMMYY";
    /**
     * Format as a date in format DD/MM HH:MM
     */
    ENumericFormat["Date_DDMMHHMM"] = "Date_DDMMHHMM";
    /**
     * Format as a date in format DD/MM
     */
    ENumericFormat["Date_DDMM"] = "Date_DDMM";
    /**
     * Format as a date in format HH:MM
     */
    ENumericFormat["Date_HHMM"] = "Date_HHMM";
    /**
     * Format as a date in format HH:MM:SS
     */
    ENumericFormat["Date_HHMMSS"] = "Date_HHMMSS";
    /**
     * Format as a date in format SS.ms
     */
    ENumericFormat["Date_SSms"] = "Date_SSms";
    /**
     * Format using Exponential notation to a specified number of significant figures eg 1.0E0, 1.5E1, 2.7E2
     * Note that this will ALWAYS be base 10, even when used on a Logarithmic axis
     */
    ENumericFormat["Exponential"] = "Exponential";
    /**
     * Format using Scientific notation to a specified number of significant figures eg 1.0x10^1, 1.5x10^2, 2.7x10^3
     * On a Logarithmic axis, the base will be the same as the axis logarithmic base
     */
    ENumericFormat["Scientific"] = "Scientific";
    /**
     * Engineering notation, eg 12.32K, 1.5M, 2.7G
     * @feature You can pass your custom prefixes as {@link IEngineeringPrefix}
     */
    ENumericFormat["Engineering"] = "Engineering";
})(ENumericFormat = exports.ENumericFormat || (exports.ENumericFormat = {}));
