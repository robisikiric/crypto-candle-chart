"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
var isRealNumber_1 = require("../utils/isRealNumber");
/**
 * Guard class for sanity-checking (null checking, check if property is true, check arrays same length etc...)
 */
var Guard = /** @class */ (function () {
    function Guard() {
    }
    /**
     * Asserts the argument is not null
     * @param arg The argument
     * @param name The argument name
     * @throws Error - an error when the argument is null or undefined
     */
    Guard.notNull = function (arg, name) {
        if (arg === undefined || arg === null) {
            throw new Error("Argument " + name + " must not be undefined");
        }
    };
    /**
     * Asserts a parameter is true
     * @param value
     * @param message The message to show if not true
     * @throws Error - an error when the parameter is false
     */
    Guard.isTrue = function (value, message) {
        if (!value) {
            throw new Error(message);
        }
    };
    /**
     * Asserts two arrays are not null (undefined) and are the same legnth
     * @param arg The first array
     * @param name1 The first array parameter name
     * @param arg2 The second array
     * @param name2 The second array parameter name
     * @throws Error - an error when the arrays are not the same length
     */
    Guard.arraysSameLength = function (arg, name1, arg2, name2) {
        this.notNull(arg, name1);
        this.notNull(arg2, name2);
        if (arg.length !== arg2.length) {
            throw new Error("Arrays ".concat(name1, " and ").concat(name2, " must have the same length"));
        }
    };
    /**
     * Asserts multiple arrays are not null (undefined) and are the same legnth
     * @param args The array of arrays
     * @throws Error - an error when the arrays are not the same length
     */
    Guard.arraysSameLengthArr = function (args) {
        var _this = this;
        if (args === void 0) { args = []; }
        args.forEach(function (el) {
            _this.notNull(el.arg, el.name);
        });
        if (args.length >= 0) {
            var firstArgLength_1 = args[0].arg.length;
            var firstArgName_1 = args[0].name;
            args.forEach(function (el) {
                if (el.arg.length !== firstArgLength_1) {
                    throw new Error("Arrays ".concat(firstArgName_1, " and ").concat(el.name, " must have the same length"));
                }
            });
        }
    };
    /**
     * Asserts a numeric argument is a real number: not null (undefined), not NaN and not infinite
     * @param d
     * @param name
     */
    Guard.argumentIsRealNumber = function (d, name) {
        if (!(0, isRealNumber_1.isRealNumber)(d)) {
            throw new Error("Argument ".concat(name, " must be a real number (not infinite, not NAN)"));
        }
    };
    /**
     * Asserts a numeric argument is a real number: not null (undefined), not NaN and not infinite
     * @param d
     * @param name
     */
    Guard.argumentIsRealInteger = function (d, name) {
        if (!Number.isInteger(d) || !(0, isRealNumber_1.isRealNumber)(d)) {
            throw new Error("Argument ".concat(name, " must be a real integer number (not infinite, not NAN)"));
        }
    };
    return Guard;
}());
exports.Guard = Guard;
