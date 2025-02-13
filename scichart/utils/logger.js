"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    // public static enableLog = false;
    Logger.log = function (message) {
        var optionalParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParameters[_i - 1] = arguments[_i];
        }
        console.log(message, optionalParameters);
    };
    Logger.debug = function (message) {
        var optionalParameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParameters[_i - 1] = arguments[_i];
        }
        if (Logger.enableDebug) {
            console.debug.apply(console, __spreadArray([message], optionalParameters, false));
        }
    };
    Logger.enableDebug = false;
    return Logger;
}());
exports.Logger = Logger;
