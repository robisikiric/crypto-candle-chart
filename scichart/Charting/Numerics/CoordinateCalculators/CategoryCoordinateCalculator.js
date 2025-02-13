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
exports.CategoryCoordinateCalculator = void 0;
var CoordinateCalculatorBase_1 = require("./CoordinateCalculatorBase");
/**
 * Provides an implementation of Numeric {@link CoordinateCalculatorBase | Coordinate Calculator} which transforms
 * numeric data indexes for {@link CategoryAxis} to pixel coordinates and vice versa.
 * @remarks
 * SciChart's {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts} perform conversion operations between
 * data-coordinates for all drawing and axis measurements.
 *
 * You can fetch a {link CategoryCoordinateCalculator} instance by calling {@link AxisCore.getCurrentCoordinateCalculator} on a {@link CategoryAxis}.
 * This will return a unique calculator for the current draw pass.
 *
 * You can convert pixel to data-indexes and back by using the following code.
 * An additional method for Category calculators transforms between data-value and index:
 * ```ts
 * const axis: AxisCore;
 * const calc = axis.getCurrentCoordinateCalculator();
 *
 * const pixel = calc.getCoordinate(11); // Gets the pixel coordinate for data at index 11
 * const dataIndex = calc.getDataValue(pixel); // Performs the inverse operation to get data-value
 * const dataValue = calc.transformIndexToData(dataIndex); // Converts index to data-value
 * ```
 * Use the Coordinate calculators when drawing, placing markers, annotations or if you want to place a tooltip over the chart.
 */
var CategoryCoordinateCalculator = /** @class */ (function (_super) {
    __extends(CategoryCoordinateCalculator, _super);
    /**
     * Creates an instance of CategoryCoordinateCalculator
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart2D | SciChart 2D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param viewportDimension The size of the associated {@link AxisCore | Axis} at the time of drawing
     * @param visibleMin The {@link CategoryAxis.visibleRange}.min at the time of drawing, corresponding to the minimum data-index visible
     * @param visibleMax The {@link CategoryAxis.visibleRange}.max at the time of drawing, corresponding to the maximum data-index visible
     * @param offset A constant pixel offset used in coordinate calculations
     */
    function CategoryCoordinateCalculator(webAssemblyContext, viewportDimension, visibleMin, visibleMax, offset) {
        if (offset === void 0) { offset = 0; }
        var _this = _super.call(this, webAssemblyContext, viewportDimension, visibleMin, visibleMax, offset, true, true) || this;
        _this.indexMin = visibleMin;
        _this.indexMax = visibleMax;
        _this.nativeCalculator = new webAssemblyContext.CategoryCoordinateCalculatorDouble(_this.viewportDimension, _this.visibleMin, _this.visibleMax, -1, _this.offset, _this.indexMin, _this.indexMax);
        return _this;
    }
    /**
     * Transforms an Index to a Data-value, with extrapolation and interpolation for values found outside of
     * {@link baseXValues | the Primary Chart series X-Values}
     * @param index the index to transform
     * @returns the Data-value
     */
    CategoryCoordinateCalculator.prototype.transformIndexToData = function (index) {
        var result = this.nativeCalculator.TransformIndexToData(index, this.baseXValues);
        return result;
    };
    /**
     * Transforms an Data-value to Index, with extrapolation and interpolation for values found outside of
     * {@link baseXValues | the Primary Chart series X-Values}
     * @param Data-Value the index to transform
     * @returns the index
     */
    CategoryCoordinateCalculator.prototype.transformDataToIndex = function (dataValue) {
        var result = this.nativeCalculator.TransformDataToIndex(dataValue, this.baseXValues);
        return result;
    };
    return CategoryCoordinateCalculator;
}(CoordinateCalculatorBase_1.CoordinateCalculatorBase));
exports.CategoryCoordinateCalculator = CategoryCoordinateCalculator;
