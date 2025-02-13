"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyOpacityToHtmlColor = exports.uintArgbColorIsTransparent = exports.uintArgbColorOverrideOpacity = exports.uintArgbColorMultiplyOpacity = exports.uintArgbColorToAbgr = exports.linearColorMapLerp = exports.uintArgbColorLerp = exports.uintArgbColorLerp24bit = void 0;
var TLinearColorMap_1 = require("../types/TLinearColorMap");
var parseColor_1 = require("./parseColor");
/**
 * Linearly interpolates between two colors based on the ratio passed in. E.g. Ratio = 0.0f returns From color,
 * ratio = 1.0f returns To Color. Ratio = 0.5f returns a mix of the two.
 * Works only for numbers not more than 24 bit
 * @param from the start color, for example 0xff0000
 * @param to the end color, for example 0x00ff00
 * @param ratio the value between 0 and 1
 * @constructor
 */
function uintArgbColorLerp24bit(from, to, ratio) {
    var mask1 = 0x00ff00ff;
    var mask2 = 0xff00ff00;
    var f2 = 256 * ratio;
    var f1 = 256 - f2;
    return (((((from & mask1) * f1 + (to & mask1) * f2) >> 8) & mask1) |
        ((((from & mask2) * f1 + (to & mask2) * f2) >> 8) & mask2));
}
exports.uintArgbColorLerp24bit = uintArgbColorLerp24bit;
/**
 * Linearly interpolates between two colors based on the ratio passed in. E.g. Ratio = 0.0f returns From color,
 * ratio = 1.0f returns To Color. Ratio = 0.5f returns a mix of the two
 * Works for 32 bit colors
 * @param from the start color, for example 0x0000ffff (format ARGB)
 * @param to the end color, for example 0xffffffff
 * @param ratio the value between 0 and 1
 * @constructor
 */
function uintArgbColorLerp(from, to, ratio) {
    // We use >>> because in js all bitwise operations are 32 bit
    // https://stackoverflow.com/questions/6798111/bitwise-operations-on-32-bit-unsigned-ints
    var from1half = from >>> 16;
    var from2half = (from & 0x0000ffff) >>> 0;
    var to1half = to >>> 16;
    var to2half = (to & 0x0000ffff) >>> 0;
    var result1half = uintArgbColorLerp24bit(from1half, to1half, ratio);
    var result2half = uintArgbColorLerp24bit(from2half, to2half, ratio);
    return ((result1half << 16) >>> 0) + result2half;
}
exports.uintArgbColorLerp = uintArgbColorLerp;
/**
 * Linearly interpolates a data-value in a TLinearColorMap, which specifies Gradient Stops, Data Minimum
 * and Maximum and color stepping mode
 * @param colorMap
 * @param dataValue
 * @constructor
 */
function linearColorMapLerp(colorMap, dataValue) {
    // Value is outside of range, return Minimum color
    if (dataValue < colorMap.Minimum) {
        return (0, parseColor_1.parseColorToUIntArgb)(colorMap.GradientStops[0].color);
    }
    // Scale the value from 0.0 -> 1.0
    var scaleFactor = 1 / (colorMap.Maximum - colorMap.Minimum);
    var scaledValue = (dataValue - colorMap.Minimum) * scaleFactor;
    var stops = colorMap.GradientStops;
    // Calculate scale factors for gradient stops
    var stopScaleFactors = [];
    var i;
    for (i = 1; i < stops.length; i++) {
        stopScaleFactors.push(1 / (stops[i].offset - stops[i - 1].offset));
    }
    for (i = 0; i < stops.length - 1; i++) {
        var stop_1 = stops[i];
        var nextStop = stops[i + 1];
        // If between two stops
        if (scaledValue >= stop_1.offset && scaledValue < nextStop.offset) {
            // Simple step? Just return the current stop color
            if (colorMap.Mode === TLinearColorMap_1.EColorMapMode.Stepped) {
                return (0, parseColor_1.parseColorToUIntArgb)(stop_1.color);
            }
            // Compute the ratio to interpolate between two stops
            var localRatio = (scaledValue - stop_1.offset) * stopScaleFactors[i];
            return uintArgbColorLerp((0, parseColor_1.parseColorToUIntArgb)(stop_1.color), (0, parseColor_1.parseColorToUIntArgb)(nextStop.color), localRatio);
        }
    }
    return (0, parseColor_1.parseColorToUIntArgb)(colorMap.GradientStops[i].color);
}
exports.linearColorMapLerp = linearColorMapLerp;
function uintArgbColorToAbgr(argbColor) {
    var r = (argbColor & 0x00ff0000) >> 16;
    var g = (argbColor & 0x0000ff00) >> 8;
    var b = argbColor & 0x000000ff;
    var retval = argbColor - (argbColor & 0x00ffffff);
    retval += b << 16;
    retval += g << 8;
    retval += r;
    return retval;
}
exports.uintArgbColorToAbgr = uintArgbColorToAbgr;
function uintArgbColorMultiplyOpacity(argbColor, opacity) {
    var alpha = argbColor - (argbColor & 0x00ffffff);
    alpha = alpha >>> 24;
    alpha *= opacity;
    alpha = Math.floor(alpha);
    alpha = alpha * 0x1000000; // ( 24 bitwise right shift simply doesn't work, as it generates a negative values )
    var rgb = argbColor & 0x00ffffff; // RGB
    return alpha + rgb;
}
exports.uintArgbColorMultiplyOpacity = uintArgbColorMultiplyOpacity;
function uintArgbColorOverrideOpacity(argbColor, opacity) {
    var alpha = opacity * 255;
    alpha = Math.floor(alpha);
    alpha = alpha * 0x1000000; // ( 24 bitwise right shift simply doesn't work, as it generates a negative values )
    var rgb = argbColor & 0x00ffffff; // RGB
    return alpha + rgb;
}
exports.uintArgbColorOverrideOpacity = uintArgbColorOverrideOpacity;
function uintArgbColorIsTransparent(argbColor) {
    var alpha = argbColor - (argbColor & 0x00ffffff);
    return alpha !== 0xff000000;
}
exports.uintArgbColorIsTransparent = uintArgbColorIsTransparent;
/**
 * Applies the given opacity to an html color code or name, returning an html color code.
 * @param color
 * @param opacity
 * @returns
 */
function applyOpacityToHtmlColor(color, opacity) {
    var tarbg = (0, parseColor_1.parseColorToTArgb)(color);
    tarbg.opacity = Math.floor(opacity * 256);
    return (0, parseColor_1.parseTArgbToHtmlColor)(tarbg);
}
exports.applyOpacityToHtmlColor = applyOpacityToHtmlColor;
