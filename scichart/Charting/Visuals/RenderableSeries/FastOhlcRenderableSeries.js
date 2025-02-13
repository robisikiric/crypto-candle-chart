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
exports.FastOhlcRenderableSeries = void 0;
var SeriesType_1 = require("../../../types/SeriesType");
var BaseOhlcRenderableSeries_1 = require("./BaseOhlcRenderableSeries");
var OhlcSeriesDrawingProvider_1 = require("./DrawingProviders/OhlcSeriesDrawingProvider");
/**
 * Defines a JavaScript OHLC stock-chart series in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add an OHLC series to a {@link SciChartSurface} you need to declare both the {@link FastOhlcRenderableSeries | RenderableSeries}
 * and a {@link OhlcDataSeries | OhlcDataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new OhlcDataSeries(wasmContext);
 * dataSeries.append(dateValues, openValues, highValues, lowValues, closeValues);
 * // Create the renderableSeries
 * const ohlcSeries = new FastOhlcRenderableSeries(wasmContext);
 * ohlcSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(ohlcSeries);
 * ```
 */
var FastOhlcRenderableSeries = /** @class */ (function (_super) {
    __extends(FastOhlcRenderableSeries, _super);
    /**
     * Creates an instance of the {@link FastOhlcRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IOhlcRenderableSeriesOptions} applied when constructing the series type
     */
    function FastOhlcRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.OhlcSeries;
        // Must be called here for the series type to be available
        if ((_a = _this.paletteProvider) === null || _a === void 0 ? void 0 : _a.onAttached) {
            (_b = _this.paletteProvider) === null || _b === void 0 ? void 0 : _b.onAttached(_this);
        }
        _this.drawingProviders = [];
        _this.drawingProviders.push(new OhlcSeriesDrawingProvider_1.OhlcSeriesDrawingProvider(webAssemblyContext, _this, OhlcSeriesDrawingProvider_1.EOhlcDrawingMode.Ohlc));
        return _this;
    }
    return FastOhlcRenderableSeries;
}(BaseOhlcRenderableSeries_1.BaseOhlcRenderableSeries));
exports.FastOhlcRenderableSeries = FastOhlcRenderableSeries;
