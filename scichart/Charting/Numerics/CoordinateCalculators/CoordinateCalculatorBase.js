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
exports.CoordinateCalculatorBase = void 0;
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var NumberRange_1 = require("../../../Core/NumberRange");
/**
 * The CoordinateCalculatorBase class provides methods for converting between Pixel and Data coordinates
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
var CoordinateCalculatorBase = /** @class */ (function (_super) {
    __extends(CoordinateCalculatorBase, _super);
    /**
     * Creates an instance of the CoordinateCalculatorBase
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param viewportDimension The size of the associated {@link AxisCore | Axis} at the time of drawing
     * @param visibleMin The {@link AxisCore.visibleRange}.min at the time of drawing
     * @param visibleMax The {@link AxisCore.visibleRange}.max at the time of drawing
     * @param offset A constant pixel offset used in coordinate calculations
     * @param hasFlippedCoordinates When true, this calculator has flipped coordinates
     * @param isCategoryCoordinateCalculator When true, this calculator behaves as a Category coordinate calculator,
     * using index not x-value for measuring
     */
    function CoordinateCalculatorBase(webAssemblyContext, viewportDimension, visibleMin, visibleMax, offset, hasFlippedCoordinates, isCategoryCoordinateCalculator) {
        if (isCategoryCoordinateCalculator === void 0) { isCategoryCoordinateCalculator = false; }
        var _this = _super.call(this) || this;
        _this.webAssemblyContext = webAssemblyContext;
        _this.visibleMax = visibleMax;
        _this.visibleMin = visibleMin;
        _this.viewportDimension = viewportDimension;
        _this.offset = offset;
        _this.hasFlippedCoordinates = hasFlippedCoordinates;
        _this.isCategoryCoordinateCalculator = isCategoryCoordinateCalculator;
        return _this;
    }
    /**
     * Converts the Data-value to a pixel coordinate
     * Performs the inverse operation to {@link getDataValue}
     * @param dataValue The data-value
     * @returns the pixel coordinate
     */
    CoordinateCalculatorBase.prototype.getCoordinate = function (dataValue) {
        return this.nativeCalculator.GetCoordinate(dataValue);
    };
    /**
     * Converts the pixel coordinate to a Data-value.
     * Performs the inverse operation to {@link getCoordinate}
     * @param coordinate The pixel coordiante
     * @returns the data value
     */
    CoordinateCalculatorBase.prototype.getDataValue = function (coordinate) {
        return this.nativeCalculator.GetDataValue(coordinate);
    };
    /**
     * Translates a {@link NumberRange} in Data-coordinates by a specified number of pixels,
     * performing intermediate calculations from data-value to pixel and back to perform the translation
     * @param pixels The pixels to translate
     * @param range The {@link NumberRange} to translate. For example this could be an {@link AxisCore.visibleRange | Axis.visibleRange}
     * @returns The translated range
     */
    CoordinateCalculatorBase.prototype.translateBy = function (pixels, range) {
        // TODO: Move into native coordinateCalculator calculator
        var rangeIncrement = this.getDataValue(pixels) - this.getDataValue(0);
        if (this.hasFlippedCoordinates) {
            rangeIncrement = -rangeIncrement;
        }
        return new NumberRange_1.NumberRange(range.min + rangeIncrement, range.max + rangeIncrement);
    };
    /**
     * Zooms a {@link NumberRange} by a specified fractional amount
     * @param minFraction The fraction to zoom the {@link NumberRange.min} by. A fraction of 0.1 zooms the minimum by 10%
     * @param maxFraction The fraction to zoom the {@link NumberRange.max} by. A fraction of 0.1 zooms the maximum by 10%
     * @param inputRange The {@link NumberRange} to zoom
     * @returns The zoomed range
     */
    CoordinateCalculatorBase.prototype.zoomTranslateBy = function (minFraction, maxFraction, inputRange) {
        return inputRange.growBy(new NumberRange_1.NumberRange(minFraction, maxFraction));
    };
    /**
     * @inheritDoc
     */
    CoordinateCalculatorBase.prototype.delete = function () {
        var _a;
        (_a = this.nativeCalculator) === null || _a === void 0 ? void 0 : _a.delete();
        this.nativeCalculator = undefined;
        this.webAssemblyContext = undefined;
    };
    return CoordinateCalculatorBase;
}(DeletableEntity_1.DeletableEntity));
exports.CoordinateCalculatorBase = CoordinateCalculatorBase;
