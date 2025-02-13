"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSCRTPen = void 0;
var app_1 = require("../../../constants/app");
var MemoryUsageHelper_1 = require("../../../utils/MemoryUsageHelper");
var colorUtil_1 = require("../../../utils/colorUtil");
var parseColor_1 = require("../../../utils/parseColor");
/**
 * Helper function to create a {@link SCRTPen} native pen
 * access to our WebGL2 Engine and WebAssembly numerical methods
 * @param wasmContext The {@link TSciChart | SciChart WebAssembly Context} containing
 * native methods and access to our WebGL2 WebAssembly Drawing Engine
 * @param htmlColorCode Html color code in the format "#fff", "#ff0000", "rgba(255,255,0,1)", "#11333333"
 * @param strokeThickness the stroke thickness of the pen in pixels
 * @param opacity The opacity factor
 * @param strokeDashArray the StrokeDashArray which defines any dash e.g. [2,2] means dash for 2pts, gap for 2pts (or undefined = solid line).
 */
var createSCRTPen = function (wasmContext, htmlColorCode, strokeThickness, opacity, strokeDashArray, antiAliased) {
    if (antiAliased === void 0) { antiAliased = true; }
    if (app_1.IS_TEST_ENV || !htmlColorCode) {
        return undefined;
    }
    // the logic for calculating an opacity should be consistent when creating new and updating an existing pen or brush
    var colorArgb = (0, colorUtil_1.uintArgbColorMultiplyOpacity)((0, parseColor_1.parseColorToUIntArgb)(htmlColorCode), opacity);
    if (isNaN(colorArgb)) {
        throw new Error("Color code ".concat(htmlColorCode, " cannot be converted to an ARGB integer"));
    }
    if (strokeDashArray && strokeDashArray.length) {
        // Create a dashed pen
        var strokeDashFloatVector_1 = new wasmContext.FloatVector();
        if (process.env.NODE_ENV !== "production") {
            // prevent unnecessary warning
            if (MemoryUsageHelper_1.MemoryUsageHelper.isMemoryUsageDebugEnabled) {
                var vectorId = MemoryUsageHelper_1.MemoryUsageHelper.objectRegistry.getObjectId(strokeDashFloatVector_1);
                MemoryUsageHelper_1.MemoryUsageHelper.unregister(vectorId);
            }
        }
        strokeDashArray.forEach(function (item) { return strokeDashFloatVector_1.push_back(item); });
        return wasmContext.SCRTCreateDahedPen(colorArgb, strokeThickness, antiAliased, strokeDashFloatVector_1);
    }
    // Create a normal pen
    return new wasmContext.SCRTPen(colorArgb, strokeThickness, antiAliased);
};
exports.createSCRTPen = createSCRTPen;
