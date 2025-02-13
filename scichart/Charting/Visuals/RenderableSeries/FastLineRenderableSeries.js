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
exports.FastLineRenderableSeries = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var SeriesType_1 = require("../../../types/SeriesType");
var BaseLineRenderableSeries_1 = require("./BaseLineRenderableSeries");
/**
 * Defines a line-series or line chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a line series to a {@link SciChartSurface} you need to declare both the {@link FastLineRenderableSeries | RenderableSeries}
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
 * const lineSeries = new FastLineRenderableSeries(wasmContext);
 * lineSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(lineSeries);
 * ```
 */
var FastLineRenderableSeries = /** @class */ (function (_super) {
    __extends(FastLineRenderableSeries, _super);
    /**
     * Creates an instance of the {@link FastLineRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IFastLineRenderableSeriesOptions} applied when constructing the series type
     */
    function FastLineRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.LineSeries;
        // Must be called here for the series type to be available
        if ((_a = _this.paletteProvider) === null || _a === void 0 ? void 0 : _a.onAttached) {
            (_b = _this.paletteProvider) === null || _b === void 0 ? void 0 : _b.onAttached(_this);
        }
        return _this;
    }
    FastLineRenderableSeries.prototype.delete = function () {
        _super.prototype.delete.call(this);
        this.resamplerHelper = (0, Deleter_1.deleteSafe)(this.resamplerHelper);
        this.pointSeries = (0, Deleter_1.deleteSafe)(this.pointSeries);
    };
    return FastLineRenderableSeries;
}(BaseLineRenderableSeries_1.BaseLineRenderableSeries));
exports.FastLineRenderableSeries = FastLineRenderableSeries;
