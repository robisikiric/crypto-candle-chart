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
exports.FastCandlestickRenderableSeries = void 0;
var SeriesType_1 = require("../../../types/SeriesType");
var IThemeProvider_1 = require("../../Themes/IThemeProvider");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
var BaseOhlcRenderableSeries_1 = require("./BaseOhlcRenderableSeries");
var constants_1 = require("./constants");
var OhlcSeriesDrawingProvider_1 = require("./DrawingProviders/OhlcSeriesDrawingProvider");
/**
 * Defines a JavaScript Candlestick stock-chart series in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a Candlestick series to a {@link SciChartSurface} you need to declare both the {@link FastCandlestickRenderableSeries | RenderableSeries}
 * and a {@link OhlcDataSeries | OhlcDataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new OhlcDataSeries(wasmContext);
 * dataSeries.append(dateValues, openValues, highValues, lowValues, closeValues);
 * // Create the renderableSeries
 * const ohlcSeries = new FastCandlestickRenderableSeries(wasmContext);
 * ohlcSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(ohlcSeries);
 * ```
 */
var FastCandlestickRenderableSeries = /** @class */ (function (_super) {
    __extends(FastCandlestickRenderableSeries, _super);
    /**
     * Creates an instance of the {@link FastCandlestickRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@linICandlestickRenderableSeriesOptionsns} applied when constructing the series type
     */
    function FastCandlestickRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.CandlestickSeries;
        _this.brushUp = (options === null || options === void 0 ? void 0 : options.brushUp) || SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.upBodyBrush;
        _this.brushDown = (options === null || options === void 0 ? void 0 : options.brushDown) || SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.downBodyBrush;
        // Must be called here for the series type to be available
        if ((_a = _this.paletteProvider) === null || _a === void 0 ? void 0 : _a.onAttached) {
            (_b = _this.paletteProvider) === null || _b === void 0 ? void 0 : _b.onAttached(_this);
        }
        _this.drawingProviders = [];
        _this.drawingProviders.push(new OhlcSeriesDrawingProvider_1.OhlcSeriesDrawingProvider(webAssemblyContext, _this, OhlcSeriesDrawingProvider_1.EOhlcDrawingMode.Candles));
        return _this;
    }
    /**
     * @inheritDoc
     */
    FastCandlestickRenderableSeries.prototype.applyTheme = function (themeProvider) {
        _super.prototype.applyTheme.call(this, themeProvider);
        var previousThemeProvider = this.parentSurface.previousThemeProvider;
        if (this.brushUp === previousThemeProvider.upBodyBrush) {
            this.brushUp = themeProvider.upBodyBrush;
        }
        if (this.brushDown === previousThemeProvider.downBodyBrush) {
            this.brushDown = themeProvider.downBodyBrush;
        }
    };
    Object.defineProperty(FastCandlestickRenderableSeries.prototype, "brushUp", {
        /**
         * Gets or sets the fill when candlestick close is greater than open, as an HTML color code
         */
        get: function () {
            return (0, IThemeProvider_1.stripAutoColor)(this.brushUpProperty);
        },
        /**
         * Gets or sets the fill when candlestick close is greater than open, as an HTML color code
         */
        set: function (htmlColorCode) {
            this.brushUpProperty = htmlColorCode;
            this.notifyPropertyChanged(constants_1.PROPERTY.BRUSH_UP);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FastCandlestickRenderableSeries.prototype, "brushDown", {
        /**
         * Gets or sets the fill when candlestick close is less than open, as an HTML color code
         */
        get: function () {
            return (0, IThemeProvider_1.stripAutoColor)(this.brushDownProperty);
        },
        /**
         * Gets or sets the fill when candlestick close is less than open, as an HTML color code
         */
        set: function (htmlColorCode) {
            this.brushDownProperty = htmlColorCode;
            this.notifyPropertyChanged(constants_1.PROPERTY.BRUSH_DOWN);
        },
        enumerable: false,
        configurable: true
    });
    FastCandlestickRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            brushDown: this.brushDown,
            brushUp: this.brushUp
        };
        Object.assign(json.options, options);
        return json;
    };
    /** @inheritDoc */
    FastCandlestickRenderableSeries.prototype.resolveAutoColors = function (index, maxSeries, theme) {
        _super.prototype.resolveAutoColors.call(this, index, maxSeries, theme);
        if (this.brushUpProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getFillColor(index, maxSeries, this.webAssemblyContext);
            this.brushUp = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("brushUp", color);
        }
        var y1Index = (index + Math.floor(maxSeries / 2)) % maxSeries;
        if (this.brushDownProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getFillColor(y1Index, maxSeries, this.webAssemblyContext);
            this.brushDown = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("brushDown", color);
        }
    };
    return FastCandlestickRenderableSeries;
}(BaseOhlcRenderableSeries_1.BaseOhlcRenderableSeries));
exports.FastCandlestickRenderableSeries = FastCandlestickRenderableSeries;
