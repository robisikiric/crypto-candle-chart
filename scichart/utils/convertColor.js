"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRgbToHexColor = exports.convertColor = void 0;
/**
 *
 * @param htmlColor, for example "00ff00" or "#00ff00" - green
 * @param opacity, value from 0 to 1
 * @returns rgbColor, for example "0xff00ff00" - green
 */
var convertColor = function (htmlColor, opacity) {
    if (opacity === void 0) { opacity = 1; }
    var opacityHex = convertComponent(opacity);
    var htmlColorLower = htmlColor.toLowerCase();
    if (htmlColorLower.length === 0) {
        return "";
    }
    if (htmlColorLower[0] === "#") {
        return "0x".concat(opacityHex).concat(htmlColorLower.substr(1));
    }
    else {
        return "0x".concat(opacityHex).concat(htmlColorLower);
    }
};
exports.convertColor = convertColor;
/**
 *
 * Converts individual R,G, and B components to HEX Color
 * @param r, red component where its value is from 0 to 1
 * @param g, green component where its value is from 0 to 1
 * @param b, blue component where its value is from 0 to 1
 * @returns argbColor, for example "0xff00ff00" - green
 */
var convertRgbToHexColor = function (r, g, b) {
    return "#" + convertComponent(r) + convertComponent(g) + convertComponent(b);
};
exports.convertRgbToHexColor = convertRgbToHexColor;
/**
 * @ignore
 * Converts number (color component) from 0 to 1 to hex string. For example 1 -> "ff", 0.5 => "80"
 * @param component
 */
var convertComponent = function (component) {
    if (component >= 1) {
        return "ff";
    }
    if (component <= 0) {
        return "00";
    }
    var num = Math.floor(component * 256);
    var hex = num.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};
