"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToPixel = void 0;
/***
 *
 * @param red - number value from 0 to 255
 * @param green - number value from 0 to 255
 * @param blue - number value from 0 to 255
 * @param opacity - number value from 0 to 255
 * @returns pixel in hex format: opacity, red, green, blue. For example: "0xff0000ff" - blue pixel with no opacity
 */
var convertToPixel = function (red, green, blue, opacity) {
    var hexValue = "0x" + toHex(opacity) + toHex(red) + toHex(green) + toHex(blue);
    return parseInt(hexValue, 16);
};
exports.convertToPixel = convertToPixel;
/**
 * @ignore
 * Converts a numeric value to hexadecimal
 * @param value
 */
var toHex = function (value) {
    if (value >= 255) {
        return "ff";
    }
    if (value <= 0) {
        return "00";
    }
    return value.toString(16);
};
