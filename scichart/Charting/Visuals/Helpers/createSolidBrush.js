"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSolidBrush = void 0;
var app_1 = require("../../../constants/app");
var colorUtil_1 = require("../../../utils/colorUtil");
var parseColor_1 = require("../../../utils/parseColor");
/**
 * Helper function to create a {@link SCRTBrush} native solid color brushes
 * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
 * access to our WebGL2 Engine and WebAssembly numerical methods
 * @param htmlColorCode Html color code in the format "#fff", "#ff0000", "rgba(255,255,0,1)", "#11333333"
 */
var createSolidBrush = function (wasmContext, htmlColorCode, opacity) {
    if (app_1.IS_TEST_ENV || !htmlColorCode) {
        return undefined;
    }
    // the logic for calculating an opacity should be consistent when creating new and updating an existing pen or brush
    var colorArgb = (0, colorUtil_1.uintArgbColorMultiplyOpacity)((0, parseColor_1.parseColorToUIntArgb)(htmlColorCode), opacity);
    var isTransparent = (0, colorUtil_1.uintArgbColorIsTransparent)(colorArgb);
    if (isNaN(colorArgb)) {
        throw new Error("Color code ".concat(htmlColorCode, " cannot be converted to an ARGB integer"));
    }
    return new wasmContext.SCRTSolidBrush(colorArgb, isTransparent);
};
exports.createSolidBrush = createSolidBrush;
