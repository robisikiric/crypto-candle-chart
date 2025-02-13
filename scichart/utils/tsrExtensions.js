"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromTsrVector4 = exports.updateTsrVector4 = void 0;
var Guard_1 = require("../Core/Guard");
/**
 * Converts a color in TArgb format to TSRVector4 (RGBA -> x,y,z,w) for use in 3D Engine
 * @param color
 * @param tsrColor
 */
var updateTsrVector4 = function (color, tsrColor) {
    Guard_1.Guard.notNull(color, "color");
    var f = 1 / 255;
    // console.log(` colorInt: R=${color.red}, G=${color.green}, B=${color.blue}, A=${color.opacity}`);
    tsrColor.x = color.red * f;
    tsrColor.y = color.green * f;
    tsrColor.z = color.blue * f;
    tsrColor.w = color.opacity * f;
    // console.log(` tsrColor: ${tsrColor.x} ${tsrColor.y} ${tsrColor.z} ${tsrColor.w}`);
};
exports.updateTsrVector4 = updateTsrVector4;
var fromTsrVector4 = function (tsrColor) {
    Guard_1.Guard.notNull(tsrColor, "tsrColor");
    return {
        red: Math.round(tsrColor.x * 255),
        green: Math.round(tsrColor.y * 255),
        blue: Math.round(tsrColor.z * 255),
        opacity: Math.round(tsrColor.w * 255)
    };
};
exports.fromTsrVector4 = fromTsrVector4;
