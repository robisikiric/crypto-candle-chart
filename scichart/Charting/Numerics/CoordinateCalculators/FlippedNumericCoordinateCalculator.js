"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlippedNumericCoordinateCalculator = void 0;
var CoordinateCalculatorBase_1 = require("./CoordinateCalculatorBase");
/**
 * Provides an implementation of Numeric {@link CoordinateCalculatorBase | Coordinate Calculator} which transforms
 * numeric data-values to pixel coordinates and vice versa. This implementation provides flipped coordinates
 * relative to {@link NumericCoordinateCalculator}
 * @remarks
 * SciChart's {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts} perform conversion operations between
 * data-coordinates for all drawing and axis measurements.
 *
 * You can fetch a CoordinateCalculator instance by calling {@link AxisCore.getCurrentCoordinateCalculator}. This will return a unique calculator
 * for the current draw pass.
 *
 * You can convert pixel to data-coordinates and back by using the following code:
 * ```ts
 * const axis: AxisCore;
 * const calc = axis.getCurrentCoordinateCalculator();
 *
 * const pixel = calc.getCoordinate(1.23); // Gets the pixel coordinate for data-value 1.23
 * const dataValue = cald.getDataValue(pixel); // Performs the inverse operation to get data-value
 * ```
 *
 * Use the Coordinate calculators when drawing, placing markers, annotations or if you want to place a tooltip over the chart.
 */
var FlippedNumericCoordinateCalculator = /** @class */ (function (_super) {
    __extends(FlippedNumericCoordinateCalculator, _super);
    /**
     * Creates an instance of FlippedNumericCoordinateCalculator
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param viewportDimension The size of the associated {@link AxisCore | Axis} at the time of drawing
     * @param visibleMin The {@link AxisCore.visibleRange}.min at the time of drawing
     * @param visibleMax The {@link AxisCore.visibleRange}.max at the time of drawing
     * @param offset A constant pixel offset used in coordinate calculations
     * @param allowFastMath When true, calculate using 32-bit floating point values (faster, but less accurate)
     */
    function FlippedNumericCoordinateCalculator(webAssemblyContext, viewportDimension, visibleMin, visibleMax, offset, allowFastMath) {
        if (offset === void 0) { offset = 0; }
        if (allowFastMath === void 0) { allowFastMath = false; }
        var _this = _super.call(this, webAssemblyContext, viewportDimension, visibleMin, visibleMax, offset, true) || this;
        _this.nativeCalculator = allowFastMath
            ? new webAssemblyContext.FlippedLinearCoordinateCalculatorSingle(_this.viewportDimension, _this.visibleMin, _this.visibleMax, -1, _this.offset)
            : new webAssemblyContext.FlippedLinearCoordinateCalculatorDouble(_this.viewportDimension, _this.visibleMin, _this.visibleMax, -1, _this.offset);
        return _this;
    }
    return FlippedNumericCoordinateCalculator;
}(CoordinateCalculatorBase_1.CoordinateCalculatorBase));
exports.FlippedNumericCoordinateCalculator = FlippedNumericCoordinateCalculator;
