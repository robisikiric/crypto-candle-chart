"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESeriesType = void 0;
/**
 * Enumeration constants to define the type of series, or chart type that a {@link BaseRenderableSeries} represents
 */
var ESeriesType;
(function (ESeriesType) {
    /** Type of {@link FastBandRenderableSeries}  */
    ESeriesType["BandSeries"] = "BandSeries";
    /** Type of {@link SplineBandRenderableSeries}  */
    ESeriesType["SplineBandSeries"] = "SplineBandSeries";
    /** Type of {@link FastBubbleRenderableSeries }  */
    ESeriesType["BubbleSeries"] = "BubbleSeries";
    /** Type of {@link FastCandlestickRenderableSeries }  */
    ESeriesType["CandlestickSeries"] = "CandlestickSeries";
    /** Type of {@link FastColumnRenderableSeries}  */
    ESeriesType["ColumnSeries"] = "ColumnSeries";
    /** Type of {@link FastImpulseRenderableSeries}  */
    ESeriesType["ImpulseSeries"] = "ImpulseSeries";
    /** Type of {@link FastLineRenderableSeries}  */
    ESeriesType["LineSeries"] = "LineSeries";
    /** Type of {@link SplineLineRenderableSeries}  */
    ESeriesType["SplineLineSeries"] = "SplineLineSeries";
    /** Type of {@link FastMountainRenderableSeries}  */
    ESeriesType["MountainSeries"] = "MountainSeries";
    /** Type of {@link SplineMountainRenderableSeries}  */
    ESeriesType["SplineMountainSeries"] = "SplineMountainSeries";
    /** Type of {@link FastOhlcRenderableSeries}  */
    ESeriesType["OhlcSeries"] = "OhlcSeries";
    /** Type of {@link StackedColumnRenderableSeries}  */
    ESeriesType["StackedColumnSeries"] = "StackedColumnSeries";
    /** Type of {@link StackedMountainRenderableSeries}  */
    ESeriesType["StackedMountainSeries"] = "StackedMountainSeries";
    /** Type of {@link SmoothStackedMountainRenderableSeries}  */
    ESeriesType["SmoothStackedMountainSeries"] = "SmoothStackedMountainSeries";
    /** Type of {@link UniformContoursRenderableSeries}  */
    ESeriesType["UniformContoursSeries"] = "UniformContoursSeries";
    /** Type of {@link UniformHeatmapRenderableSeries}  */
    ESeriesType["UniformHeatmapSeries"] = "UniformHeatmapSeries";
    /** Type of {@link NonUniformHeatmapRenderableSeries}  */
    ESeriesType["NonUniformHeatmapSeries"] = "NonUniformHeatmapSeries";
    /** Type of {@link StackedMountainCollection}  */
    ESeriesType["StackedMountainCollection"] = "StackedMountainCollection";
    /** Type of {@link StackedColumnCollection}  */
    ESeriesType["StackedColumnCollection"] = "StackedColumnCollection";
    /** Type of {@link XyScatterRenderableSeries}  */
    ESeriesType["ScatterSeries"] = "ScatterSeries";
    /** Type of {@link FastErrorBarsRenderableSeries}  */
    ESeriesType["ErrorBarsSeries"] = "ErrorBarsSeries";
    /** Type of {@link FastTextRenderableSeries}  */
    ESeriesType["TextSeries"] = "TextSeries";
    /** Custom series type */
    ESeriesType["Custom"] = "Custom";
})(ESeriesType = exports.ESeriesType || (exports.ESeriesType = {}));
