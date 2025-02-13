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
exports.FastBubbleRenderableSeries = void 0;
var SeriesType_1 = require("../../../types/SeriesType");
var XyzPointSeriesWrapped_1 = require("../../Model/PointSeries/XyzPointSeriesWrapped");
var EllipsePointMarker_1 = require("../PointMarkers/EllipsePointMarker");
var BaseRenderableSeries_1 = require("./BaseRenderableSeries");
var BubbleSeriesDrawingProvider_1 = require("./DrawingProviders/BubbleSeriesDrawingProvider");
var BubbleSeriesHitTestProvider_1 = require("./HitTest/BubbleSeriesHitTestProvider");
var BubbleSeriesDataLabelProvider_1 = require("./DataLabels/BubbleSeriesDataLabelProvider");
var constants_1 = require("./constants");
/**
 * Defines a bubble-series or JavaScript bubble chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a bubble series to a {@link SciChartSurface} you need to declare both the {@link FastBubbleRenderableSeries | RenderableSeries}
 * and a {@link XyzDataSeries | XyzDataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new XyzDataSeries(wasmContext);
 * dataSeries.append(1,2,3);
 * dataSeries.append(4,5,6);
 * // Create the renderableSeries
 * const bubbleSeries = new FastBubbleRenderableSeries(wasmContext);
 * bubbleSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(bubbleSeries);
 * ```
 */
var FastBubbleRenderableSeries = /** @class */ (function (_super) {
    __extends(FastBubbleRenderableSeries, _super);
    /**
     * Creates an instance of the {@link FastBubbleRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IBubbleRenderableSeriesOptions} applied when constructing the series type
     */
    function FastBubbleRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, webAssemblyContext, options) || this;
        /** @inheritDoc */
        _this.type = SeriesType_1.ESeriesType.BubbleSeries;
        _this.zMultiplierProperty = 1;
        _this.zMultiplierProperty = (_a = options === null || options === void 0 ? void 0 : options.zMultiplier) !== null && _a !== void 0 ? _a : _this.zMultiplierProperty;
        if (!_this.pointMarker) {
            _this.pointMarker = new EllipsePointMarker_1.EllipsePointMarker(webAssemblyContext, { width: 64, height: 64 });
        }
        // Must be called here for the series type to be available
        if ((_b = _this.paletteProvider) === null || _b === void 0 ? void 0 : _b.onAttached) {
            (_c = _this.paletteProvider) === null || _c === void 0 ? void 0 : _c.onAttached(_this);
        }
        _this.drawingProviders = [];
        _this.drawingProviders.push(new BubbleSeriesDrawingProvider_1.BubbleSeriesDrawingProvider(webAssemblyContext, _this));
        if (!_this.dataLabelProviderProperty) {
            _this.dataLabelProviderProperty = new BubbleSeriesDataLabelProvider_1.BubbleSeriesDataLabelProvider(options === null || options === void 0 ? void 0 : options.dataLabels);
            _this.dataLabelProviderProperty.onAttach(_this.webAssemblyContext, _this);
        }
        if (options === null || options === void 0 ? void 0 : options.animation) {
            _this.animationQueue.push(options.animation);
        }
        return _this;
    }
    Object.defineProperty(FastBubbleRenderableSeries.prototype, "paletteProvider", {
        /** @inheritDoc */
        get: function () {
            return this.paletteProviderProperty;
        },
        /** @inheritDoc */
        set: function (paletteProvider) {
            this.setPaletteProvider(paletteProvider);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FastBubbleRenderableSeries.prototype, "zMultiplier", {
        /**
         * Gets or sets the scale value of the bubble sizes
         */
        get: function () {
            return this.zMultiplierProperty;
        },
        /**
         * Gets or sets the scale value of the bubble sizes
         */
        set: function (value) {
            this.zMultiplierProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.Z_MULTIPLIER);
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    FastBubbleRenderableSeries.prototype.applyTheme = function (themeProvider) {
        _super.prototype.applyTheme.call(this, themeProvider);
        var previousThemeProvider = this.parentSurface.previousThemeProvider;
        if (this.stroke === previousThemeProvider.lineSeriesColor) {
            this.stroke = themeProvider.lineSeriesColor;
        }
    };
    /**
     * Gets the bubble diameter in pixels for the point index, by looking up the Z-value in the
     * associated {@link XyzDataSeries}
     * @param pointIndex
     */
    FastBubbleRenderableSeries.prototype.getBubbleDiameter = function (pointIndex) {
        return this.dataSeries.getNativeZValues().get(pointIndex);
    };
    /**
     * Returns the {@link XyyDataSeries.getNativeZValues} for the associated {@link dataSeries}
     */
    FastBubbleRenderableSeries.prototype.getNativeZValues = function () {
        return this.dataSeries.getNativeZValues();
    };
    /** @inheritDoc */
    FastBubbleRenderableSeries.prototype.toPointSeries = function (resamplingParams) {
        return new XyzPointSeriesWrapped_1.XyzPointSeriesWrapped(this.dataSeries);
    };
    /** @inheritDoc */
    FastBubbleRenderableSeries.prototype.newHitTestProvider = function () {
        return new BubbleSeriesHitTestProvider_1.BubbleSeriesHitTestProvider(this, this.webAssemblyContext);
    };
    /** @inheritDoc */
    FastBubbleRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            zMultiplier: this.zMultiplier
        };
        Object.assign(json.options, options);
        return json;
    };
    return FastBubbleRenderableSeries;
}(BaseRenderableSeries_1.BaseRenderableSeries));
exports.FastBubbleRenderableSeries = FastBubbleRenderableSeries;
