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
exports.ScatterRenderableSeries3D = void 0;
var ScatterPointsSceneEntity_1 = require("../Primitives/ScatterPointsSceneEntity");
var BaseRenderableSeries3D_1 = require("./BaseRenderableSeries3D");
var ESeriesType_1 = require("./ESeriesType");
/**
 * Defines a 3D scatter-series or 3D Bubble chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * To add a 3D scatter series to a {@link SciChart3DSurface} you need to declare both the {@link ScatterRenderableSeries3D}
 * and a {@link XyzDataSeries3D}. Simplified code sample below:
 *
 * ```ts
 * const sciChart3DSurface: SciChart3DSurface;
 * const wasmContext: TSciChart3D;
 * // Create and fill the dataseries
 * const dataSeries = new XyzDataSeries3D(wasmContext);
 * dataSeries.append(1,2,3);
 * dataSeries.append(3,4,5);
 * // Create the renderableSeries
 * const scatterSeries = new ScatterRenderableSeries3D(wasmContext);
 * scatterSeries.dataSeries = dataSeries;
 * scatterSeries.pointMarker = new SpherePointMarker3D(wasmContext, {
 *     size: 3,
 *     fill: "#FF0000"
 * });
 * // append to the SciChartSurface
 * sciChart3DSurface.renderableSeries.add(scatterSeries);
 * ```
 */
var ScatterRenderableSeries3D = /** @class */ (function (_super) {
    __extends(ScatterRenderableSeries3D, _super);
    /**
     * Creates an instance of a {@link ScatterRenderableSeries3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IBaseRenderableSeries3DOptions} to configure the series
     */
    function ScatterRenderableSeries3D(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = ESeriesType_1.ESeriesType3D.ScatterRenderableSeries3D;
        _this.setSceneEntity(new ScatterPointsSceneEntity_1.ScatterPointsSceneEntity(webAssemblyContext, _this));
        return _this;
    }
    return ScatterRenderableSeries3D;
}(BaseRenderableSeries3D_1.BaseRenderableSeries3D));
exports.ScatterRenderableSeries3D = ScatterRenderableSeries3D;
