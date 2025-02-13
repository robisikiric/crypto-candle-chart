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
exports.SplineMountainRenderableSeries = void 0;
var SeriesType_1 = require("../../../types/SeriesType");
var BaseMountainRenderableSeries_1 = require("./BaseMountainRenderableSeries");
var constants_1 = require("./constants");
var SplineRenderDataTransform_1 = require("./RenderDataTransforms/SplineRenderDataTransform");
/**
 * Defines a mountain/area series or JavaScript mountain chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a spline mountain series to a {@link SciChartSurface} you need to declare both the {@link SplineMountainRenderableSeries | RenderableSeries}
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
 * const mountainSeries = new SplineMountainRenderableSeries(wasmContext);
 * mountainSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(mountainSeries);
 * ```
 */
var SplineMountainRenderableSeries = /** @class */ (function (_super) {
    __extends(SplineMountainRenderableSeries, _super);
    /**
     * Creates an instance of the {@link SplineMountainRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link ISplineMountainRenderableSeriesOptions} applied when constructing the series type
     */
    function SplineMountainRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.SplineMountainSeries;
        _this.isSplineProperty = true;
        _this.interpolationPointsProperty = 10;
        _this.interpolationPointsProperty = (_a = options === null || options === void 0 ? void 0 : options.interpolationPoints) !== null && _a !== void 0 ? _a : _this.interpolationPointsProperty;
        _this.renderDataTransform = new SplineRenderDataTransform_1.SplineRenderDataTransform(_this, webAssemblyContext, [_this.drawingProviders[0]]);
        _this.renderDataTransform.interpolationPoints = _this.interpolationPoints;
        // Must be called here for the series type to be available
        if ((_b = _this.paletteProvider) === null || _b === void 0 ? void 0 : _b.onAttached) {
            (_c = _this.paletteProvider) === null || _c === void 0 ? void 0 : _c.onAttached(_this);
        }
        return _this;
    }
    Object.defineProperty(SplineMountainRenderableSeries.prototype, "isSpline", {
        get: function () {
            return this.isSplineProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineMountainRenderableSeries.prototype, "interpolationPoints", {
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
    Object.defineProperty(SplineMountainRenderableSeries.prototype, "xSplineValues", {
        get: function () {
            if (!this.transformedRenderPassData) {
                throw Error("Spline values are not available until after first render, or call updateSplineValues");
            }
            return this.transformedRenderPassData.pointSeries.xValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineMountainRenderableSeries.prototype, "ySplineValues", {
        get: function () {
            if (!this.transformedRenderPassData) {
                throw Error("Spline values are not available until after first render, or call updateSplineValues");
            }
            return this.transformedRenderPassData.pointSeries.yValues;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SplineMountainRenderableSeries.prototype, "warnOnSplineFailure", {
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
    SplineMountainRenderableSeries.prototype.updateSplineValues = function () {
        this.updateTransformedValues();
    };
    /** @deprecated This is now handled within the renderDataTransform */
    SplineMountainRenderableSeries.prototype.onSplineFailure = function () { };
    /** @inheritDoc */
    SplineMountainRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            interpolationPoints: this.interpolationPoints
        };
        Object.assign(json.options, options);
        return json;
    };
    return SplineMountainRenderableSeries;
}(BaseMountainRenderableSeries_1.BaseMountainRenderableSeries));
exports.SplineMountainRenderableSeries = SplineMountainRenderableSeries;
