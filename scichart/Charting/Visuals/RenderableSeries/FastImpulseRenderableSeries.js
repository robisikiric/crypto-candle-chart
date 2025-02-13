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
exports.FastImpulseRenderableSeries = void 0;
var NumberRange_1 = require("../../../Core/NumberRange");
var SeriesType_1 = require("../../../types/SeriesType");
var IThemeProvider_1 = require("../../Themes/IThemeProvider");
var EllipsePointMarker_1 = require("../PointMarkers/EllipsePointMarker");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
var BaseRenderableSeries_1 = require("./BaseRenderableSeries");
var constants_1 = require("./constants");
var FastColumnRenderableSeries_1 = require("./FastColumnRenderableSeries");
var ImpulseSeriesHitTestProvider_1 = require("./HitTest/ImpulseSeriesHitTestProvider");
/**
 * Defines a impulse-series or JavaScript impulse chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a impulse series to a {@link SciChartSurface} you need to declare both the {@link FastImpulseRenderableSeries | RenderableSeries}
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
 * const impulseSeries = new FastImpulseRenderableSeries(wasmContext);
 * impulseSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(impulseSeries);
 * ```
 */
var FastImpulseRenderableSeries = /** @class */ (function (_super) {
    __extends(FastImpulseRenderableSeries, _super);
    /**
     * Creates an instance of the {@link FastImpulseRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IImpulseRenderableSeries} applied when constructing the series type
     */
    function FastImpulseRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, webAssemblyContext, options) || this;
        /** @inheritDoc */
        _this.type = SeriesType_1.ESeriesType.ImpulseSeries;
        _this.impulseFillProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.impulseFillBrush;
        _this.impulseSizeProperty = 10;
        _this.impulseDataPointWidthProperty = 0;
        _this.impulseStrokeThicknessProperty = 1;
        _this.strokeThickness = (_a = options === null || options === void 0 ? void 0 : options.strokeThickness) !== null && _a !== void 0 ? _a : _this.impulseStrokeThicknessProperty;
        _this.fill = (_b = options === null || options === void 0 ? void 0 : options.fill) !== null && _b !== void 0 ? _b : _this.impulseFillProperty;
        _this.size = (_c = options === null || options === void 0 ? void 0 : options.size) !== null && _c !== void 0 ? _c : _this.impulseSizeProperty;
        _this.stroke = (_d = options === null || options === void 0 ? void 0 : options.fill) !== null && _d !== void 0 ? _d : _this.impulseFillProperty;
        _this.dataPointWidth = _this.impulseDataPointWidthProperty;
        if (!(options === null || options === void 0 ? void 0 : options.pointMarker)) {
            _this.pointMarker = new EllipsePointMarker_1.EllipsePointMarker(webAssemblyContext, {
                width: _this.impulseSizeProperty,
                height: _this.impulseSizeProperty,
                fill: _this.fill,
                stroke: _this.fill
            });
        }
        return _this;
    }
    Object.defineProperty(FastImpulseRenderableSeries.prototype, "fill", {
        /**
         * Gets or sets the color of each impulse
         */
        get: function () {
            return (0, IThemeProvider_1.stripAutoColor)(this.impulseFillProperty);
        },
        set: function (htmlColorCode) {
            this.impulseFillProperty = htmlColorCode;
            this.stroke = htmlColorCode;
            if (this.pointMarker) {
                this.pointMarker.fill = htmlColorCode;
                this.pointMarker.stroke = htmlColorCode;
            }
            if (this.impulseFillProperty !== htmlColorCode) {
                this.notifyPropertyChanged(constants_1.PROPERTY.STROKE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FastImpulseRenderableSeries.prototype, "size", {
        /**
         * Gets or sets the size of each impulse point
         */
        get: function () {
            return this.impulseSizeProperty;
        },
        set: function (sizeParam) {
            this.impulseSizeProperty = sizeParam;
            if (this.pointMarker) {
                this.pointMarker.width = sizeParam;
                this.pointMarker.height = sizeParam;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    FastImpulseRenderableSeries.prototype.getXRange = function () {
        var _a, _b;
        var range = _super.prototype.getXRange.call(this);
        var delta = (0, BaseRenderableSeries_1.getDelta)({
            pointSize: this.size,
            areaSize: (_b = (_a = this.parentSurface.seriesViewRect) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0,
            range: range
        });
        return new NumberRange_1.NumberRange(range.min - delta, range.max + delta);
    };
    /**
     * @inheritDoc
     */
    FastImpulseRenderableSeries.prototype.getYRange = function (xVisibleRange, isXCategoryAxis) {
        var _a, _b;
        if (isXCategoryAxis === void 0) { isXCategoryAxis = false; }
        var yRange = _super.prototype.getYRange.call(this, xVisibleRange, isXCategoryAxis);
        if (!yRange) {
            return undefined;
        }
        var delta = (0, BaseRenderableSeries_1.getDelta)({
            pointSize: this.size,
            areaSize: (_b = (_a = this.parentSurface.seriesViewRect) === null || _a === void 0 ? void 0 : _a.height) !== null && _b !== void 0 ? _b : 0,
            range: yRange
        });
        return new NumberRange_1.NumberRange(yRange.min - delta, yRange.max + delta);
    };
    /** @inheritDoc */
    FastImpulseRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            fill: this.fill,
            size: this.size,
            zeroLineY: this.zeroLineY
        };
        Object.assign(json.options, options);
        return json;
    };
    /** @inheritDoc */
    FastImpulseRenderableSeries.prototype.applyTheme = function (themeProvider) {
        _super.prototype.applyTheme.call(this, themeProvider);
        var previousThemeProvider = this.parentSurface.previousThemeProvider;
        if (this.fill === previousThemeProvider.impulseFillBrush) {
            this.fill = themeProvider.impulseFillBrush;
        }
    };
    /** @inheritDoc */
    FastImpulseRenderableSeries.prototype.resolveAutoColors = function (index, maxSeries, theme) {
        _super.prototype.resolveAutoColors.call(this, index, maxSeries, theme);
        if (this.impulseFillProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getStrokeColor(index, maxSeries, this.webAssemblyContext);
            this.fill = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("impulseFill", color);
        }
    };
    /** @inheritDoc */
    FastImpulseRenderableSeries.prototype.newHitTestProvider = function () {
        return new ImpulseSeriesHitTestProvider_1.ImpulseSeriesHitTestProvider(this, this.webAssemblyContext);
    };
    return FastImpulseRenderableSeries;
}(FastColumnRenderableSeries_1.FastColumnRenderableSeries));
exports.FastImpulseRenderableSeries = FastImpulseRenderableSeries;
