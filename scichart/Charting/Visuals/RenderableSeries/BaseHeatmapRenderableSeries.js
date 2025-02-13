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
exports.BaseHeatmapRenderableSeries = exports.COLOR_MAP_PREFIX = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var AxisCore_1 = require("../Axis/AxisCore");
var NumericLabelProvider_1 = require("../Axis/LabelProvider/NumericLabelProvider");
var BaseRenderableSeries_1 = require("./BaseRenderableSeries");
var constants_1 = require("./constants");
var HeatmapColorMap_1 = require("./HeatmapColorMap");
/** @ignore */
exports.COLOR_MAP_PREFIX = "colorMap.";
/**
 * @summary A JavaScript Heatmap chart type rendering a 2-dimensional array of data as color values between X,Y bounds in
 * SciChart's High Performance Real-time {@link https://www.scichart.com/javascript-chart-features | JavaScript Chart Library}
 * @description
 * Heatmaps are 2-dimensional arrays of data, rendered as a color-map on the chart. The {@link UniformHeatmapRenderableSeries}
 * assumes the cells are equal size, and spaced along the X,Y axis according to properties on the {@link UniformHeatmapDataSeries}.
 *
 * For a code sample how to initialize a uniform heatmap, see below
 *
 * ```ts
 * // Create an empty 2D array using the helper function zeroArray2D
 * const zValues: number[][] = zeroArray2D([height, width]);
 * // todo: fill the zValues 2d array with values
 *
 * // Create a UniformHeatmapDataSeries passing in zValues
 * const heatmapDataSeries = new UniformHeatmapDataSeries(wasmContext, 0, 1, 0, 1, zValues);
 *
 * // Create a Heatmap RenderableSeries with the color map. ColorMap.minimum/maximum defines the values in
 * // HeatmapDataSeries which correspond to gradient stops at 0..1
 * const heatmapSeries = new UniformHeatmapRenderableSeries(wasmContext, {
 *        dataSeries: heatmapDataSeries,
 *        colorMap: new HeatmapColorMap({
 *            minimum: 0,
 *           maximum: 200,
 *           gradientStops: [
 *               { offset: 0, color: "#00008B" },
 *               { offset: 0.2, color: "#6495ED" },
 *               { offset: 0.4, color: "#006400" },
 *               { offset: 0.6, color: "#7FFF00" },
 *               { offset: 0.8, color: "#FFFF00" },
 *               { offset: 1.0, color: "#FF0000" }
 *           ]
 *       })
 *   });
 *
 * // Add heatmap to the chart
 * sciChartSurface.renderableSeries.add(heatmapSeries);
 * ```
 */
var BaseHeatmapRenderableSeries = /** @class */ (function (_super) {
    __extends(BaseHeatmapRenderableSeries, _super);
    /**
     * Creates an instance of the {@link UniformHeatmapRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IHeatmapRenderableSeriesOptions} applied when constructing the series type
     */
    function BaseHeatmapRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.useLinearTextureFilteringProperty = false;
        _this.fillValuesOutOfRangeProperty = true;
        _this.colorMapPropertyChanged = _this.colorMapPropertyChanged.bind(_this);
        if (options === null || options === void 0 ? void 0 : options.colorMap) {
            if (!("toJSON" in options.colorMap)) {
                options.colorMap = new HeatmapColorMap_1.HeatmapColorMap(options.colorMap);
            }
        }
        _this.colorMap = options === null || options === void 0 ? void 0 : options.colorMap;
        _this.dataSeries = options === null || options === void 0 ? void 0 : options.dataSeries;
        _this.xAxisId = (_a = options === null || options === void 0 ? void 0 : options.xAxisId) !== null && _a !== void 0 ? _a : AxisCore_1.AxisCore.DEFAULT_AXIS_ID;
        _this.yAxisId = (_b = options === null || options === void 0 ? void 0 : options.yAxisId) !== null && _b !== void 0 ? _b : AxisCore_1.AxisCore.DEFAULT_AXIS_ID;
        _this.useLinearTextureFilteringProperty =
            (_c = options === null || options === void 0 ? void 0 : options.useLinearTextureFiltering) !== null && _c !== void 0 ? _c : _this.useLinearTextureFilteringProperty;
        _this.fillValuesOutOfRangeProperty = (_d = options === null || options === void 0 ? void 0 : options.fillValuesOutOfRange) !== null && _d !== void 0 ? _d : _this.fillValuesOutOfRangeProperty;
        // Must be called here for the series type to be available
        if ((_e = _this.paletteProvider) === null || _e === void 0 ? void 0 : _e.onAttached) {
            (_f = _this.paletteProvider) === null || _f === void 0 ? void 0 : _f.onAttached(_this);
        }
        _this.zLabelProviderProperty = new NumericLabelProvider_1.NumericLabelProvider({ labelPrecision: 2 });
        return _this;
    }
    Object.defineProperty(BaseHeatmapRenderableSeries.prototype, "colorMap", {
        /**
         * Gets or sets the {@link HeatmapColorMap}, which maps heatmap z-values to colors
         */
        get: function () {
            return this.colorMapProperty;
        },
        /**
         * Gets or sets the {@link HeatmapColorMap}, which maps heatmap z-values to colors
         */
        set: function (colorMap) {
            var _a, _b;
            (_a = this.colorMapProperty) === null || _a === void 0 ? void 0 : _a.propertyChanged.unsubscribe(this.colorMapPropertyChanged);
            this.colorMapProperty = colorMap;
            (_b = this.colorMapProperty) === null || _b === void 0 ? void 0 : _b.propertyChanged.subscribe(this.colorMapPropertyChanged);
            this.notifyPropertyChanged(constants_1.PROPERTY.COLOR_MAP);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseHeatmapRenderableSeries.prototype, "useLinearTextureFiltering", {
        /**
         * Gets or sets whether to make the heatmap linearly interpolated or smoothed between cells
         */
        get: function () {
            return this.useLinearTextureFilteringProperty;
        },
        /**
         * Gets or sets whether to make the heatmap linearly interpolated or smoothed between cells
         */
        set: function (value) {
            this.useLinearTextureFilteringProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.USE_LINEAR_TEXTURE_FILTERING);
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    BaseHeatmapRenderableSeries.prototype.checkIsOutOfDataRange = function (xValue, yValue) {
        var dataSeries = this.dataSeries;
        return (!dataSeries ||
            xValue <= dataSeries.xRange.min ||
            xValue >= dataSeries.xRange.max ||
            yValue <= dataSeries.yRange.min ||
            yValue >= dataSeries.yRange.max);
    };
    Object.defineProperty(BaseHeatmapRenderableSeries.prototype, "zLabelProvider", {
        get: function () {
            return this.zLabelProviderProperty;
        },
        set: function (labelProvider) {
            this.zLabelProviderProperty = labelProvider;
            this.notifyPropertyChanged(constants_1.PROPERTY.Z_LABEL_PROVIDER);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseHeatmapRenderableSeries.prototype, "fillValuesOutOfRange", {
        /**
         * Gets or sets whether to fill cells with edge color if its value is outside of {@link colorMap.minimum} to {@link colorMap.maximum} range
         */
        get: function () {
            return this.fillValuesOutOfRangeProperty;
        },
        /**
         * Gets or sets whether to fill cells with edge color if its value is outside of {@link colorMap.minimum} to {@link colorMap.maximum} range
         */
        set: function (value) {
            this.fillValuesOutOfRangeProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.FILL_VALUES_OUT_OF_RANGE);
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    BaseHeatmapRenderableSeries.prototype.toPointSeries = function (resamplingParams) {
        // not used for Heatmap
        return undefined;
    };
    /** @inheritDoc */
    BaseHeatmapRenderableSeries.prototype.toJSON = function (excludeData) {
        var _a;
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            colorMap: (_a = this.colorMap) === null || _a === void 0 ? void 0 : _a.toJSON(),
            fillValuesOutOfRange: this.fillValuesOutOfRange,
            useLinearTextureFiltering: this.useLinearTextureFiltering
        };
        Object.assign(json.options, options);
        return json;
    };
    BaseHeatmapRenderableSeries.prototype.delete = function () {
        this.zLabelProviderProperty = (0, Deleter_1.deleteSafe)(this.zLabelProviderProperty);
        _super.prototype.delete.call(this);
    };
    /**
     * Called when a property changes on {@link HeatmapColorMap}, and notifies the parent {@link SciChartSurface}
     * that a redraw is required.
     * @param args
     */
    BaseHeatmapRenderableSeries.prototype.colorMapPropertyChanged = function (args) {
        this.notifyPropertyChanged(exports.COLOR_MAP_PREFIX + args.propertyName);
    };
    return BaseHeatmapRenderableSeries;
}(BaseRenderableSeries_1.BaseRenderableSeries));
exports.BaseHeatmapRenderableSeries = BaseHeatmapRenderableSeries;
