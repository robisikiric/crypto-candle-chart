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
exports.SplineLineRenderableSeries = void 0;
var SeriesType_1 = require("../../../types/SeriesType");
var BaseLineRenderableSeries_1 = require("./BaseLineRenderableSeries");
var constants_1 = require("./constants");
var SplineRenderDataTransform_1 = require("./RenderDataTransforms/SplineRenderDataTransform");
/**
 * Defines a line-series or line chart type with Cubic Spline interpolation in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a line series to a {@link SciChartSurface} you need to declare both the {@link SplineLineRenderableSeries | RenderableSeries}
 * and a {@link XyDataSeries | DataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new XyDataSeries(wasmContext);
 * dataSeries.append(1,2);
 * dataSeries.append(1,2);
 * // Create the renderableSeries
 * const lineSeries = new SplineLineRenderableSeries(wasmContext);
 * lineSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(lineSeries);
 * ```
 */
var SplineLineRenderableSeries = /** @class */ (function (_super) {
    __extends(SplineLineRenderableSeries, _super);
    /**
     * Creates an instance of the {@link SplineLineRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link ISplineLineRenderableSeriesOptions} applied when constructing the series type
     */
    function SplineLineRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.SplineLineSeries;
        // public xSplineValues: SCRTDoubleVector;
        // public ySplineValues: SCRTDoubleVector;
        _this.isSplineProperty = true;
        _this.interpolationPointsProperty = 10;
        // this.xSplineValues = new webAssemblyContext.SCRTDoubleVector();
        // this.ySplineValues = new webAssemblyContext.SCRTDoubleVector();
        _this.interpolationPointsProperty = (_a = options === null || options === void 0 ? void 0 : options.interpolationPoints) !== null && _a !== void 0 ? _a : _this.interpolationPointsProperty;
        _this.renderDataTransform = new SplineRenderDataTransform_1.SplineRenderDataTransform(_this, webAssemblyContext, [_this.drawingProviders[0]]);
        _this.renderDataTransform.interpolationPoints = _this.interpolationPoints;
        // Must be called here for the series type to be available
        if ((_b = _this.paletteProvider) === null || _b === void 0 ? void 0 : _b.onAttached) {
            (_c = _this.paletteProvider) === null || _c === void 0 ? void 0 : _c.onAttached(_this);
        }
        return _this;
    }
    Object.defineProperty(SplineLineRenderableSeries.prototype, "xSplineValues", {
        get: function () {
            if (!this.transformedRenderPassData) {
                throw Error("Spline values are not available until after first render, or call updateSplineValues");
            }
            return this.transformedRenderPassData.pointSeries.xValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineLineRenderableSeries.prototype, "ySplineValues", {
        get: function () {
            if (!this.transformedRenderPassData) {
                throw Error("Spline values are not available until after first render, or call updateSplineValues");
            }
            return this.transformedRenderPassData.pointSeries.yValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineLineRenderableSeries.prototype, "isSpline", {
        get: function () {
            return this.isSplineProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineLineRenderableSeries.prototype, "interpolationPoints", {
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
    Object.defineProperty(SplineLineRenderableSeries.prototype, "warnOnSplineFailure", {
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
    SplineLineRenderableSeries.prototype.updateSplineValues = function () {
        this.updateTransformedValues();
    };
    /** @deprecated This is now handled within the renderDataTransform */
    SplineLineRenderableSeries.prototype.onSplineFailure = function () { };
    /** @inheritDoc */
    SplineLineRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            interpolationPoints: this.interpolationPoints
        };
        Object.assign(json.options, options);
        return json;
    };
    return SplineLineRenderableSeries;
}(BaseLineRenderableSeries_1.BaseLineRenderableSeries));
exports.SplineLineRenderableSeries = SplineLineRenderableSeries;
