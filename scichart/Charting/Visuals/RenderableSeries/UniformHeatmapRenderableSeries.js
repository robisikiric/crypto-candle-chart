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
exports.UniformHeatmapRenderableSeries = void 0;
var app_1 = require("../../../constants/app");
var SeriesType_1 = require("../../../types/SeriesType");
var BaseHeatmapRenderableSeries_1 = require("./BaseHeatmapRenderableSeries");
var HeatMapDataLabelProvider_1 = require("./DataLabels/HeatMapDataLabelProvider");
var UniformHeatmapDrawingProvider_1 = require("./DrawingProviders/UniformHeatmapDrawingProvider");
var UniformHeatmapHitTestProvider_1 = require("./HitTest/UniformHeatmapHitTestProvider");
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
var UniformHeatmapRenderableSeries = /** @class */ (function (_super) {
    __extends(UniformHeatmapRenderableSeries, _super);
    /**
     * Creates an instance of the {@link UniformHeatmapRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IHeatmapRenderableSeriesOptions} applied when constructing the series type
     */
    function UniformHeatmapRenderableSeries(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.UniformHeatmapSeries;
        _this.drawingProviders = [];
        if (!app_1.IS_TEST_ENV) {
            _this.drawingProviders.push(new UniformHeatmapDrawingProvider_1.UniformHeatmapDrawingProvider(webAssemblyContext, _this));
        }
        if (!_this.dataLabelProviderProperty) {
            _this.dataLabelProviderProperty = new HeatMapDataLabelProvider_1.HeatMapDataLabelProvider(options === null || options === void 0 ? void 0 : options.dataLabels);
            _this.dataLabelProviderProperty.onAttach(_this.webAssemblyContext, _this);
        }
        return _this;
    }
    /**
     * @inheritDoc
     */
    UniformHeatmapRenderableSeries.prototype.newHitTestProvider = function () {
        return new UniformHeatmapHitTestProvider_1.UniformHeatmapHitTestProvider(this, this.webAssemblyContext);
    };
    return UniformHeatmapRenderableSeries;
}(BaseHeatmapRenderableSeries_1.BaseHeatmapRenderableSeries));
exports.UniformHeatmapRenderableSeries = UniformHeatmapRenderableSeries;
