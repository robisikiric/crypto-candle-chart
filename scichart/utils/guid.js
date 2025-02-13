"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Id = exports.generateGuid = void 0;
/**
 * @description Generates GUID/UUID RFC4122 version 4 compliant
 */
var generateGuid = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0;
        var v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
exports.generateGuid = generateGuid;
/**
 * Generate random base64 id string.
 * The default length is 22 which is 132-bits so almost the same as a GUID but as base64
 * @param maxLength - Optional value to specify the length of the id to be generated, defaults to 22
 */
var base64Id = function (maxLength) {
    if (maxLength === void 0) { maxLength = 22; }
    var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var result = "";
    while (result.length < maxLength) {
        var number = Math.floor(Math.random() * 64);
        result += base64chars.charAt(number);
    }
    return result;
};
exports.base64Id = base64Id;
