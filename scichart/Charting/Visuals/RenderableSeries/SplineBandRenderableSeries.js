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
exports.SplineBandRenderableSeries = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var NumberRange_1 = require("../../../Core/NumberRange");
var SeriesType_1 = require("../../../types/SeriesType");
var isRealNumber_1 = require("../../../utils/isRealNumber");
var BaseDataSeries_1 = require("../../Model/BaseDataSeries");
var IDataSeries_1 = require("../../Model/IDataSeries");
var XyyPointSeriesWrapped_1 = require("../../Model/PointSeries/XyyPointSeriesWrapped");
var RenderPassData_1 = require("../../Services/RenderPassData");
var BaseBandRenderableSeries_1 = require("./BaseBandRenderableSeries");
var constants_1 = require("./constants");
var XyySplineRenderDataTransform_1 = require("./RenderDataTransforms/XyySplineRenderDataTransform");
/**
 * Defines a JavaScript Spline Band-series or High-Low polygon fill chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a line series to a {@link SciChartSurface} you need to declare both the {@link SplineBandRenderableSeries | RenderableSeries}
 * and a {@link XyyDataSeries | DataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new XyyDataSeries(wasmContext);
 * dataSeries.append(1,2,3);
 * dataSeries.append(2,3,4);
 * // Create the renderableSeries
 * const bandSeries = new SplineBandRenderableSeries(wasmContext);
 * bandSeries.dataSeries = dataSeries;
 * // Set interpolation points
 * bandSeries.interpolationPoints = 10;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(bandSeries);
 * ```
 */
var SplineBandRenderableSeries = /** @class */ (function (_super) {
    __extends(SplineBandRenderableSeries, _super);
    /**
     * Creates an instance of the {@link SplineBandRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link ISplineBandRenderableSeriesOptions} applied when constructing the series type
     */
    function SplineBandRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.SplineBandSeries;
        _this.isSplineProperty = true;
        _this.interpolationPointsProperty = 10;
        _this.interpolationPointsProperty = (_a = options === null || options === void 0 ? void 0 : options.interpolationPoints) !== null && _a !== void 0 ? _a : _this.interpolationPointsProperty;
        _this.renderDataTransform = new XyySplineRenderDataTransform_1.XyySplineRenderDataTransform(_this, webAssemblyContext, [
            _this.drawingProviders[0]
        ]);
        _this.renderDataTransform.interpolationPoints = _this.interpolationPoints;
        // Must be called here for the series type to be available
        if ((_b = _this.paletteProvider) === null || _b === void 0 ? void 0 : _b.onAttached) {
            (_c = _this.paletteProvider) === null || _c === void 0 ? void 0 : _c.onAttached(_this);
        }
        return _this;
    }
    Object.defineProperty(SplineBandRenderableSeries.prototype, "isSpline", {
        get: function () {
            return this.isSplineProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineBandRenderableSeries.prototype, "interpolationPoints", {
        /**
         * Gets or sets the interpolationPoints being used for the Spline
         */
        get: function () {
            return this.interpolationPointsProperty;
        },
        /**
         * Gets or sets the interpolationPoints being used for the Spline
         */
        set: function (value) {
            this.interpolationPointsProperty = value;
            this.renderDataTransform.interpolationPoints = this.interpolationPoints;
            this.renderDataTransform.requiresTransform = true;
            this.notifyPropertyChanged(constants_1.PROPERTY.INTERPOLATION_POINTS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineBandRenderableSeries.prototype, "xSplineValues", {
        get: function () {
            if (!this.transformedRenderPassData) {
                throw Error("Spline values are not available until after first render, or call updateSplineValues");
            }
            return this.transformedRenderPassData.pointSeries.xValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineBandRenderableSeries.prototype, "ySplineValues", {
        get: function () {
            if (!this.transformedRenderPassData) {
                throw Error("Spline values are not available until after first render, or call updateSplineValues");
            }
            return this.transformedRenderPassData.pointSeries.yValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineBandRenderableSeries.prototype, "y1SplineValues", {
        get: function () {
            if (!this.transformedRenderPassData) {
                throw Error("Spline values are not available until after first render, or call updateSplineValues");
            }
            return this.transformedRenderPassData.pointSeries.y1Values;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineBandRenderableSeries.prototype, "warnOnSplineFailure", {
        /**
         * Set false to disable the warning if the spline cannot be calculated
         */
        get: function () {
            return this.renderDataTransform.warnOnSplineFailure;
        },
        /**
         * Set false to disable the warning if the spline cannot be calculated
         */
        set: function (value) {
            this.renderDataTransform.warnOnSplineFailure = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Updates spline values
     */
    SplineBandRenderableSeries.prototype.updateTransformedValues = function () {
        var _a;
        if (!this.dataSeries || !this.parentSurface) {
            return;
        }
        if (!this.currentRenderPassData) {
            var pointSeries = ((_a = this.resamplingParams) === null || _a === void 0 ? void 0 : _a.resampleRequired)
                ? this.pointSeries
                : new XyyPointSeriesWrapped_1.XyyPointSeriesWrapped(this.dataSeries, undefined);
            this.currentRenderPassData = new RenderPassData_1.RenderPassData(this.getIndicesRange(this.xAxis.visibleRange, this.xAxis.isCategoryAxis), this.xAxis.getCurrentCoordinateCalculator, this.yAxis.getCurrentCoordinateCalculator, this.xAxis.isVerticalChart, pointSeries);
        }
        this.transformedRenderPassData = this.renderDataTransform.runTransform(this.currentRenderPassData);
    };
    SplineBandRenderableSeries.prototype.updateSplineValues = function () {
        this.updateTransformedValues();
    };
    /** @deprecated This is now handled within the renderDataTransform */
    SplineBandRenderableSeries.prototype.onSplineFailure = function () { };
    /** @inheritDoc */
    SplineBandRenderableSeries.prototype.getYRange = function (xVisibleRange, isXCategoryAxis) {
        var _a;
        if (isXCategoryAxis === void 0) { isXCategoryAxis = false; }
        if (this.isRunningAnimation) {
            return this.dataSeries.getWindowedYRange(xVisibleRange, true, isXCategoryAxis, IDataSeries_1.EDataSeriesValueType.Default, this.yRangeMode);
        }
        this.updateSplineValues();
        var xValues = this.xSplineValues;
        var yValues = this.ySplineValues;
        var y1Values = this.y1SplineValues;
        // TODO: getPositiveRange
        // if one point
        if (xValues.size() === 1) {
            var min = Math.min(yValues.get(0), y1Values.get(0));
            var max = Math.max(yValues.get(0), y1Values.get(0));
            return new NumberRange_1.NumberRange(min, max);
        }
        var indicesRange = isXCategoryAxis
            ? xVisibleRange
            : (0, BaseDataSeries_1.getIndicesRange)(this.webAssemblyContext, xValues, xVisibleRange, (_a = this.dataSeries) === null || _a === void 0 ? void 0 : _a.dataDistributionCalculator.isSortedAscending);
        var iMin = Math.max(Math.floor(indicesRange.min), 0);
        var iMax = Math.min(Math.ceil(indicesRange.max), xValues.size() - 1);
        if (iMax < iMin) {
            return undefined;
        }
        var minMax;
        var minMaxy1;
        try {
            minMax = this.webAssemblyContext.NumberUtil.MinMaxWithIndex(yValues, iMin, iMax - iMin + 1);
            if (!(0, isRealNumber_1.isRealNumber)(minMax.minD) || !(0, isRealNumber_1.isRealNumber)(minMax.maxD)) {
                return undefined;
            }
            minMaxy1 = this.webAssemblyContext.NumberUtil.MinMaxWithIndex(y1Values, iMin, iMax - iMin + 1);
            if (!(0, isRealNumber_1.isRealNumber)(minMaxy1.minD) || !(0, isRealNumber_1.isRealNumber)(minMaxy1.maxD)) {
                return undefined;
            }
            return new NumberRange_1.NumberRange(Math.min(minMax.minD, minMaxy1.minD), Math.max(minMax.maxD, minMaxy1.maxD));
        }
        finally {
            (0, Deleter_1.deleteSafe)(minMax);
            (0, Deleter_1.deleteSafe)(minMaxy1);
        }
    };
    /** @inheritDoc */
    SplineBandRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            interpolationPoints: this.interpolationPoints
        };
        Object.assign(json.options, options);
        return json;
    };
    return SplineBandRenderableSeries;
}(BaseBandRenderableSeries_1.BaseBandRenderableSeries));
exports.SplineBandRenderableSeries = SplineBandRenderableSeries;
