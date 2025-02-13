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
exports.FastBandRenderableSeries = void 0;
var SeriesType_1 = require("../../../types/SeriesType");
var BaseBandRenderableSeries_1 = require("./BaseBandRenderableSeries");
/**
 * Defines a JavaScript Band-series or High-Low polygon fill chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a line series to a {@link SciChartSurface} you need to declare both the {@link FastBandRenderableSeries | RenderableSeries}
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
 * const bandSeries = new FastBandRenderableSeries(wasmContext);
 * bandSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(bandSeries);
 * ```
 */
var FastBandRenderableSeries = /** @class */ (function (_super) {
    __extends(FastBandRenderableSeries, _super);
    /**
     * Creates an instance of the {@link FastBandRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IBandRenderableSeriesOptions} applied when constructing the series type
     */
    function FastBandRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.BandSeries;
        // Must be called here for the series type to be available
        if ((_a = _this.paletteProvider) === null || _a === void 0 ? void 0 : _a.onAttached) {
            (_b = _this.paletteProvider) === null || _b === void 0 ? void 0 : _b.onAttached(_this);
        }
        return _this;
    }
    return FastBandRenderableSeries;
}(BaseBandRenderableSeries_1.BaseBandRenderableSeries));
exports.FastBandRenderableSeries = FastBandRenderableSeries;
