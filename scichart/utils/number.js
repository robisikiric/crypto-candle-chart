"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsNaN = exports.toEngineering = exports.toScientific = exports.toSuperScript = exports.formatNumber = exports.numericHashCode = exports.formatNumber2Digits = void 0;
var NumericFormat_1 = require("../types/NumericFormat");
var date_1 = require("./date");
var math_1 = require("./math");
/**
 * @description Formats value always to have 2 decimal digits, e.g. 12.45, 14.20, 17.00
 * @param value
 */
var formatNumber2Digits = function (value) {
    return (Math.round((value + Number.EPSILON) * 100) / 100).toFixed(2);
};
exports.formatNumber2Digits = formatNumber2Digits;
var numericHashCode = function (hash, value) {
    hash = hash * 31 - hash + value;
    hash |= 0; // Convert to 32bit integer
    return hash;
};
exports.numericHashCode = numericHashCode;
var formatNumber = function (dataValue, numericFormat, precision, engineeringPrefix) {
    if (dataValue === undefined)
        return "";
    switch (numericFormat) {
        case NumericFormat_1.ENumericFormat.NoFormat:
            return dataValue.toString();
        case NumericFormat_1.ENumericFormat.Decimal:
            return dataValue.toFixed(precision);
        case NumericFormat_1.ENumericFormat.SignificantFigures:
            // Number here avoids toPrecision sometimes producing exponential format
            return Number(dataValue.toPrecision(precision)).toString();
        case NumericFormat_1.ENumericFormat.Exponential:
            return dataValue.toExponential(precision);
        case NumericFormat_1.ENumericFormat.Scientific:
            return (0, exports.toScientific)(dataValue, precision, 10);
        case NumericFormat_1.ENumericFormat.Date_DDMMYYYY:
            return (0, date_1.formatUnixDateToHumanString)(dataValue);
        case NumericFormat_1.ENumericFormat.Date_DDMMYY:
            return (0, date_1.formatUnixDateToHumanStringDDMMYY)(dataValue);
        case NumericFormat_1.ENumericFormat.Date_DDMMHHMM:
            return (0, date_1.formatUnixDateToHumanStringDDMMHHMM)(dataValue);
        case NumericFormat_1.ENumericFormat.Date_DDMM:
            return (0, date_1.formatUnixDateToHumanStringDDMM)(dataValue);
        case NumericFormat_1.ENumericFormat.Date_HHMM:
            return (0, date_1.formatUnixDateToHumanStringHHMM)(dataValue);
        case NumericFormat_1.ENumericFormat.Date_HHMMSS:
            return (0, date_1.formatUnixDateToHumanStringHHMMSS)(dataValue);
        case NumericFormat_1.ENumericFormat.Date_SSms:
            return (0, date_1.formatUnixDateToHumanStringSSms)(dataValue);
        case NumericFormat_1.ENumericFormat.Engineering:
            return (0, exports.toEngineering)(dataValue, engineeringPrefix === null || engineeringPrefix === void 0 ? void 0 : engineeringPrefix.large, engineeringPrefix === null || engineeringPrefix === void 0 ? void 0 : engineeringPrefix.small);
    }
};
exports.formatNumber = formatNumber;
var superScript_map = [
    "\u2070",
    "\u00B9",
    "\u00B2",
    "\u00B3",
    "\u2074",
    "\u2075",
    "\u2076",
    "\u2077",
    "\u2078",
    "\u2079"
];
var toSuperScript = function (value) {
    var str = "";
    var isNegative = value < 0;
    var valStr = Math.abs(value).toString();
    //  Loop through all digits
    for (var _i = 0, valStr_1 = valStr; _i < valStr_1.length; _i++) {
        var char = valStr_1[_i];
        //  Current digit's value
        var digit = Number.parseInt(char);
        if (!isNaN(digit)) {
            //  Append as superscript character
            str += superScript_map[digit];
        }
    }
    return (isNegative ? "\u207B" : "") + str;
};
exports.toSuperScript = toSuperScript;
var toScientific = function (value, precision, logarithmicBase) {
    if (value === 0)
        return "0";
    var exponent = (0, math_1.logToBase)(Math.abs(value), logarithmicBase);
    exponent = Math.floor(exponent);
    var sig = value / Math.pow(logarithmicBase, exponent);
    return sig.toPrecision(precision).toString() + "x" + logarithmicBase.toString() + (0, exports.toSuperScript)(exponent);
};
exports.toScientific = toScientific;
var toEngineering = function (value, largePrefixes, smallPrefixes) {
    // default prefixes, if user sent nothing
    var absValue = Math.abs(value);
    if ((largePrefixes === null || largePrefixes === void 0 ? void 0 : largePrefixes.length) == 0 && (smallPrefixes === null || smallPrefixes === void 0 ? void 0 : smallPrefixes.length) == 0)
        return value.toString();
    if (!largePrefixes && absValue > 1)
        largePrefixes = ['K', 'M', 'B', 'T'];
    if (!smallPrefixes && absValue < 1)
        smallPrefixes = ['m', 'µ', 'n', 'p'];
    // if user passes empty array
    if (absValue > 999) { // supunitary & needs formatting
        for (var exponent = 1; exponent <= largePrefixes.length; exponent++) {
            if (absValue < Math.pow(10, 3 * (exponent + 1))) {
                return (value / Math.pow(10, 3 * exponent)).toPrecision(3) + largePrefixes[exponent - 1];
            }
        }
        // If the value is still larger than the highest defined prefix
        return Math.floor(value / Math.pow(10, 3 * largePrefixes.length)) + largePrefixes[largePrefixes.length - 1];
    }
    else if (absValue < 1 && value !== 0) { // subunitary
        for (var exponent = 0; exponent < smallPrefixes.length; exponent++) {
            if (absValue >= Math.pow(10, -3 * (exponent + 1))) {
                return (value * Math.pow(10, 3 * (exponent + 1))).toPrecision(3) + smallPrefixes[exponent];
            }
        }
        // If the value is still smaller than the lowest defined prefix
        return (value * Math.pow(10, 3 * smallPrefixes.length)) + smallPrefixes[smallPrefixes.length - 1];
    }
    return value.toString();
};
exports.toEngineering = toEngineering;
// if value !== value is a simple but fast isNaN check
// equivalent to isNaN(zValueRaw)
var checkIsNaN = function (value) { return value !== value; };
exports.checkIsNaN = checkIsNaN;
