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
exports.SmoothStackedMountainRenderableSeries = void 0;
var SeriesType_1 = require("../../../types/SeriesType");
var BezierRenderDataTransform_1 = require("./RenderDataTransforms/BezierRenderDataTransform");
var StackedMountainRenderableSeries_1 = require("./StackedMountainRenderableSeries");
/**
 * @summary The {@link SmoothStackedMountainRenderableSeries} allows creating JavaScript Smoothed Stacked Mountain charts
 * @description
 * Multiple {@link StackedMountainRenderableSeries} are required to create a stacked mountain chart type in SciChart.
 * These are grouped with a {@link StackedMountainCollection}, which implements {@link IRenderableSeries} and may be added
 * directly to a {@link SciChartSurface.renderableSeries} collection.
 *
 * Code sample below for creating a stacked mountain chart
 * ```ts
 * const stackedMountain0 = new StackedMountainRenderableSeries(wasmContext);
 * // .. configure mountain 1, including set dataSeries
 * const stackedMountain1 = new StackedMountainRenderableSeries(wasmContext);
 * // .. configure mountain 2, including set dataSeries
 * const stackedMountain2 = new StackedMountainRenderableSeries(wasmContext);
 * // .. configure mountain 3, including set dataSeries
 * const stackedMountainCollection = new StackedMountainCollection(wasmContext);
 * stackedMountainCollection.add(stackedMountain0, stackedMountain1, stackedMountain2);
 *
 * sciChartSurface.renderableSeries.add(stackedMountainCollection);
 * ````
 * @remarks
 * Do not add the {@link StackedMountainRenderableSeries} directly to {@link SciChartSurface.renderableSeries} array, instead,
 * use a {@link StackedMountainCollection} to group / stack the mountains.
 */
var SmoothStackedMountainRenderableSeries = /** @class */ (function (_super) {
    __extends(SmoothStackedMountainRenderableSeries, _super);
    function SmoothStackedMountainRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.SmoothStackedMountainSeries;
        var transform = new BezierRenderDataTransform_1.SmoothStackedRenderDataTransform(_this, webAssemblyContext, []);
        transform.interpolationPoints = (_a = options === null || options === void 0 ? void 0 : options.interpolationPoints) !== null && _a !== void 0 ? _a : transform.interpolationPoints;
        transform.curvature = (_b = options === null || options === void 0 ? void 0 : options.curvature) !== null && _b !== void 0 ? _b : transform.curvature;
        _this.renderDataTransform = transform;
        return _this;
    }
    return SmoothStackedMountainRenderableSeries;
}(StackedMountainRenderableSeries_1.StackedMountainRenderableSeries));
exports.SmoothStackedMountainRenderableSeries = SmoothStackedMountainRenderableSeries;
