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
exports.LogarithmicCoordinateCalculator = void 0;
var NumberRange_1 = require("../../../Core/NumberRange");
var XyDirection_1 = require("../../../types/XyDirection");
var CoordinateCalculatorBase_1 = require("./CoordinateCalculatorBase");
/**
 * Provides an implementation of Numeric {@link CoordinateCalculatorBase | Coordinate Calculator} which transforms
 * numeric data-values to pixel coordinates using logarithmic scaling and vice versa.
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
var LogarithmicCoordinateCalculator = /** @class */ (function (_super) {
    __extends(LogarithmicCoordinateCalculator, _super);
    /**
     * Creates an instance of LogarithmicCoordinateCalculator
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param viewportDimension The size of the associated {@link AxisCore | Axis} at the time of drawing
     * @param visibleMin The {@link AxisCore.visibleRange}.min at the time of drawing
     * @param visibleMax The {@link AxisCore.visibleRange}.max at the time of drawing
     * @param xyDirection Whether the parent axis is an X or Y axis
     * @param logBase The Logarithmic base, e.g. 10, for calculating log coordinates
     * @param flipCoordinates Whether the flip-coordinates flag is true on the associated axis
     * @param offset A constant pixel offset used in coordinate calculations
     */
    function LogarithmicCoordinateCalculator(webAssemblyContext, viewportDimension, visibleMin, visibleMax, xyDirection, logBase, flipCoordinates, offset) {
        if (offset === void 0) { offset = 0; }
        var _this = this;
        var isXAxis = xyDirection === XyDirection_1.EXyDirection.XDirection;
        _this = _super.call(this, webAssemblyContext, viewportDimension, visibleMin, visibleMax, offset, flipCoordinates) || this;
        _this.logBaseProperty = logBase;
        _this.nativeCalculator = flipCoordinates
            ? new webAssemblyContext.FlippedLogarithmicCoordinateCalculator(_this.viewportDimension, _this.visibleMin, _this.visibleMax, -1, _this.offset, _this.logBase)
            : new webAssemblyContext.LogarithmicCoordinateCalculator(_this.viewportDimension, _this.visibleMin, _this.visibleMax, -1, _this.offset, _this.logBase);
        return _this;
    }
    Object.defineProperty(LogarithmicCoordinateCalculator.prototype, "logBase", {
        get: function () {
            return this.logBaseProperty;
        },
        enumerable: false,
        configurable: true
    });
    LogarithmicCoordinateCalculator.prototype.translateBy = function (pixels, range) {
        if (pixels === 0) {
            return range;
        }
        var zeroPoint = Math.abs(this.nativeCalculator.GetDataValue(0));
        var toScrollPoint = Math.abs(this.nativeCalculator.GetDataValue(pixels));
        var numberUtil = this.webAssemblyContext.NumberUtil;
        var isNegative = range.min < 0;
        if (isNegative) {
            range = new NumberRange_1.NumberRange(Math.abs(range.max), Math.abs(range.min));
        }
        var expDelta = numberUtil.Log(toScrollPoint, this.logBase) - numberUtil.Log(zeroPoint, this.logBase);
        if (this.hasFlippedCoordinates)
            expDelta = -expDelta;
        var expMin = numberUtil.Log(range.min, this.logBase);
        var expMax = numberUtil.Log(range.max, this.logBase);
        var newMin = Math.pow(this.logBase, expMin + expDelta);
        var newMax = Math.pow(this.logBase, expMax + expDelta);
        if (isNegative)
            return new NumberRange_1.NumberRange(-newMax, -newMin);
        else
            return new NumberRange_1.NumberRange(newMin, newMax);
    };
    LogarithmicCoordinateCalculator.prototype.zoomTranslateBy = function (minFraction, maxFraction, inputRange) {
        return inputRange.growByLog(new NumberRange_1.NumberRange(minFraction, maxFraction), this.logBase);
    };
    return LogarithmicCoordinateCalculator;
}(CoordinateCalculatorBase_1.CoordinateCalculatorBase));
exports.LogarithmicCoordinateCalculator = LogarithmicCoordinateCalculator;
