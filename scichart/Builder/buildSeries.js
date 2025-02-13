"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSeries = void 0;
var DataPointSelectionPaletteProvider_1 = require("../Charting/Model/DataPointSelectionPaletteProvider");
var IDataSeries_1 = require("../Charting/Model/IDataSeries");
var IPointMetadata_1 = require("../Charting/Model/IPointMetadata");
var PaletteFactory_1 = require("../Charting/Model/PaletteFactory");
var CrossPointMarker_1 = require("../Charting/Visuals/PointMarkers/CrossPointMarker");
var EllipsePointMarker_1 = require("../Charting/Visuals/PointMarkers/EllipsePointMarker");
var SpritePointMarker_1 = require("../Charting/Visuals/PointMarkers/SpritePointMarker");
var SquarePointMarker_1 = require("../Charting/Visuals/PointMarkers/SquarePointMarker");
var TrianglePointMarker_1 = require("../Charting/Visuals/PointMarkers/TrianglePointMarker");
var XPointMarker_1 = require("../Charting/Visuals/PointMarkers/XPointMarker");
var FadeAnimation_1 = require("../Charting/Visuals/RenderableSeries/Animations/FadeAnimation");
var ScaleAnimation_1 = require("../Charting/Visuals/RenderableSeries/Animations/ScaleAnimation");
var SweepAnimation_1 = require("../Charting/Visuals/RenderableSeries/Animations/SweepAnimation");
var WaveAnimation_1 = require("../Charting/Visuals/RenderableSeries/Animations/WaveAnimation");
var BandSeriesDataLabelProvider_1 = require("../Charting/Visuals/RenderableSeries/DataLabels/BandSeriesDataLabelProvider");
var BubbleSeriesDataLabelProvider_1 = require("../Charting/Visuals/RenderableSeries/DataLabels/BubbleSeriesDataLabelProvider");
var ColumnSeriesDataLabelProvider_1 = require("../Charting/Visuals/RenderableSeries/DataLabels/ColumnSeriesDataLabelProvider");
var ContoursDataLabelProvider_1 = require("../Charting/Visuals/RenderableSeries/DataLabels/ContoursDataLabelProvider");
var DataLabelProvider_1 = require("../Charting/Visuals/RenderableSeries/DataLabels/DataLabelProvider");
var HeatMapDataLabelProvider_1 = require("../Charting/Visuals/RenderableSeries/DataLabels/HeatMapDataLabelProvider");
var LineSeriesDataLabelProvider_1 = require("../Charting/Visuals/RenderableSeries/DataLabels/LineSeriesDataLabelProvider");
var NonUniformHeatmapDataLabelProvider_1 = require("../Charting/Visuals/RenderableSeries/DataLabels/NonUniformHeatmapDataLabelProvider");
var TextDataLabelProvider_1 = require("../Charting/Visuals/RenderableSeries/DataLabels/TextDataLabelProvider");
var FastBandRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/FastBandRenderableSeries");
var FastBubbleRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/FastBubbleRenderableSeries");
var FastCandlestickRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/FastCandlestickRenderableSeries");
var FastColumnRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/FastColumnRenderableSeries");
var FastErrorBarsRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/FastErrorBarsRenderableSeries");
var FastImpulseRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/FastImpulseRenderableSeries");
var FastLineRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/FastLineRenderableSeries");
var FastMountainRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/FastMountainRenderableSeries");
var FastOhlcRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/FastOhlcRenderableSeries");
var FastTextRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/FastTextRenderableSeries");
var GlowEffect_1 = require("../Charting/Visuals/RenderableSeries/GlowEffect");
var NonUniformHeatmapRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/NonUniformHeatmapRenderableSeries");
var ShadowEffect_1 = require("../Charting/Visuals/RenderableSeries/ShadowEffect");
var SplineBandRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/SplineBandRenderableSeries");
var SplineLineRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/SplineLineRenderableSeries");
var SplineMountainRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/SplineMountainRenderableSeries");
var SmoothStackedMountainRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/SmoothStackedMountainRenderableSeries");
var StackedColumnCollection_1 = require("../Charting/Visuals/RenderableSeries/StackedColumnCollection");
var StackedColumnRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/StackedColumnRenderableSeries");
var StackedMountainCollection_1 = require("../Charting/Visuals/RenderableSeries/StackedMountainCollection");
var StackedMountainRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/StackedMountainRenderableSeries");
var UniformContoursRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/UniformContoursRenderableSeries");
var UniformHeatmapRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/UniformHeatmapRenderableSeries");
var XyScatterRenderableSeries_1 = require("../Charting/Visuals/RenderableSeries/XyScatterRenderableSeries");
var AnimationType_1 = require("../types/AnimationType");
var BaseType_1 = require("../types/BaseType");
var DataLabelProviderType_1 = require("../types/DataLabelProviderType");
var PaletteProviderType_1 = require("../types/PaletteProviderType");
var PointMarkerType_1 = require("../types/PointMarkerType");
var SeriesType_1 = require("../types/SeriesType");
var ShaderEffectType_1 = require("../types/ShaderEffectType");
var buildDataSeries_1 = require("./buildDataSeries");
var chartBuilder_1 = require("./chartBuilder");
var classFactory_1 = require("./classFactory");
(0, classFactory_1.registerWasmType)(BaseType_1.EBaseType.PointMarker, PointMarkerType_1.EPointMarkerType.Cross, function (wasm, options) { return new CrossPointMarker_1.CrossPointMarker(wasm, options); }, true);
(0, classFactory_1.registerWasmType)(BaseType_1.EBaseType.PointMarker, PointMarkerType_1.EPointMarkerType.Ellipse, function (wasm, options) { return new EllipsePointMarker_1.EllipsePointMarker(wasm, options); }, true);
(0, classFactory_1.registerWasmType)(BaseType_1.EBaseType.PointMarker, PointMarkerType_1.EPointMarkerType.Sprite, function (wasm, options) { return new SpritePointMarker_1.SpritePointMarker(wasm, options); }, true);
(0, classFactory_1.registerWasmType)(BaseType_1.EBaseType.PointMarker, PointMarkerType_1.EPointMarkerType.Square, function (wasm, options) { return new SquarePointMarker_1.SquarePointMarker(wasm, options); }, true);
(0, classFactory_1.registerWasmType)(BaseType_1.EBaseType.PointMarker, PointMarkerType_1.EPointMarkerType.Triangle, function (wasm, options) { return new TrianglePointMarker_1.TrianglePointMarker(wasm, options); }, true);
(0, classFactory_1.registerWasmType)(BaseType_1.EBaseType.PointMarker, PointMarkerType_1.EPointMarkerType.X, function (wasm, options) { return new XPointMarker_1.XPointMarker(wasm, options); }, true);
(0, classFactory_1.registerWasmType)(BaseType_1.EBaseType.ShaderEffect, ShaderEffectType_1.EShaderEffectType.Glow, function (wasm, options) { return new GlowEffect_1.GlowEffect(wasm, options); }, true);
(0, classFactory_1.registerWasmType)(BaseType_1.EBaseType.ShaderEffect, ShaderEffectType_1.EShaderEffectType.Shadow, function (wasm, options) { return new ShadowEffect_1.ShadowEffect(wasm, options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Animation, AnimationType_1.EAnimationType.Fade, function (options) { return new FadeAnimation_1.FadeAnimation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Animation, AnimationType_1.EAnimationType.Scale, function (options) { return new ScaleAnimation_1.ScaleAnimation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Animation, AnimationType_1.EAnimationType.Sweep, function (options) { return new SweepAnimation_1.SweepAnimation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Animation, AnimationType_1.EAnimationType.Wave, function (options) { return new WaveAnimation_1.WaveAnimation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.DataLabelProvider, DataLabelProviderType_1.EDataLabelProviderType.Default, function (options) { return new DataLabelProvider_1.DataLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.DataLabelProvider, DataLabelProviderType_1.EDataLabelProviderType.Line, function (options) { return new LineSeriesDataLabelProvider_1.LineSeriesDataLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.DataLabelProvider, DataLabelProviderType_1.EDataLabelProviderType.Column, function (options) { return new ColumnSeriesDataLabelProvider_1.ColumnSeriesDataLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.DataLabelProvider, DataLabelProviderType_1.EDataLabelProviderType.Text, function (options) { return new TextDataLabelProvider_1.TextDataLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.DataLabelProvider, DataLabelProviderType_1.EDataLabelProviderType.Heatmap, function (options) { return new HeatMapDataLabelProvider_1.HeatMapDataLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.DataLabelProvider, DataLabelProviderType_1.EDataLabelProviderType.NonUniformHeatmap, function (options) { return new NonUniformHeatmapDataLabelProvider_1.NonUniformHeatMapDataLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.DataLabelProvider, DataLabelProviderType_1.EDataLabelProviderType.Bubble, function (options) { return new BubbleSeriesDataLabelProvider_1.BubbleSeriesDataLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.DataLabelProvider, DataLabelProviderType_1.EDataLabelProviderType.Band, function (options) { return new BandSeriesDataLabelProvider_1.BandSeriesDataLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.DataLabelProvider, DataLabelProviderType_1.EDataLabelProviderType.Contours, function (options) { return new ContoursDataLabelProvider_1.ContoursDataLabelProvider(options); }, true);
// Metadata
(0, classFactory_1.registerType)(BaseType_1.EBaseType.MetadataGenerator, "Template", function (template) { return new IPointMetadata_1.TemplateMetadataGenerator(template); }, true);
// PaletteProviders
// Default palette provider is not required as it is created automatically if none is provided.
(0, classFactory_1.registerWasmType)(BaseType_1.EBaseType.PaletteProvider, PaletteProviderType_1.EPaletteProviderType.Gradient, function (wasmContext, gradientBrush) { return PaletteFactory_1.PaletteFactory.createGradient(wasmContext, gradientBrush); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.PaletteProvider, PaletteProviderType_1.EPaletteProviderType.DataPointSelection, function (selectedStyle) { return new DataPointSelectionPaletteProvider_1.DataPointSelectionPaletteProvider(selectedStyle); }, true);
function hasOwnProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}
var getDataSeriesDefinition = function (seriesDefinition) {
    if (hasOwnProperty(seriesDefinition, "xyData")) {
        return { type: IDataSeries_1.EDataSeriesType.Xy, options: seriesDefinition.xyData };
    }
    else if (hasOwnProperty(seriesDefinition, "xyyData")) {
        return { type: IDataSeries_1.EDataSeriesType.Xyy, options: seriesDefinition.xyyData };
    }
    else if (hasOwnProperty(seriesDefinition, "xyzData")) {
        return { type: IDataSeries_1.EDataSeriesType.Xyz, options: seriesDefinition.xyzData };
    }
    else if (hasOwnProperty(seriesDefinition, "xyTextData")) {
        return { type: IDataSeries_1.EDataSeriesType.XyText, options: seriesDefinition.xyTextData };
    }
    else if (hasOwnProperty(seriesDefinition, "hlcData")) {
        return { type: IDataSeries_1.EDataSeriesType.Hlc, options: seriesDefinition.hlcData };
    }
    else if (hasOwnProperty(seriesDefinition, "ohlcData")) {
        return { type: IDataSeries_1.EDataSeriesType.Ohlc, options: seriesDefinition.ohlcData };
    }
    else if (hasOwnProperty(seriesDefinition, "heatmapData") &&
        (seriesDefinition.type === SeriesType_1.ESeriesType.UniformHeatmapSeries ||
            seriesDefinition.type === SeriesType_1.ESeriesType.UniformContoursSeries)) {
        return { type: IDataSeries_1.EDataSeriesType.HeatmapUniform, options: seriesDefinition.heatmapData };
    }
    else if (hasOwnProperty(seriesDefinition, "heatmapData") &&
        seriesDefinition.type === SeriesType_1.ESeriesType.NonUniformHeatmapSeries) {
        return { type: IDataSeries_1.EDataSeriesType.HeatmapNonUniform, options: seriesDefinition.heatmapData };
    }
    else {
        return undefined;
    }
};
/**
 * Build one or more renderable series from a definition that can be pure data.
 * @param wasmContext A {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart | SciChart 3D WebAssembly Context}
 * @param definition One or an array of {@link TSeriesDefinition}
 * @param sharedData Optional {@link TSharedDataDefinition} to define shared data which can be referenced by the renderable series
 * @returns An array of {@link IRenderableSeries}.
 */
var buildSeries = function (wasmContext, definition, sharedData) {
    if (typeof definition === "string") {
        definition = JSON.parse(definition, chartBuilder_1.chartReviver);
    }
    if (typeof sharedData === "string") {
        sharedData = JSON.parse(sharedData, chartBuilder_1.chartReviver);
    }
    var result = [];
    if (!Array.isArray(definition)) {
        definition = [definition];
    }
    for (var _i = 0, definition_1 = definition; _i < definition_1.length; _i++) {
        var seriesDef = definition_1[_i];
        var series = void 0;
        if (seriesDef.type === SeriesType_1.ESeriesType.BandSeries) {
            series = new FastBandRenderableSeries_1.FastBandRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.BubbleSeries) {
            series = new FastBubbleRenderableSeries_1.FastBubbleRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.CandlestickSeries) {
            series = new FastCandlestickRenderableSeries_1.FastCandlestickRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.ColumnSeries) {
            series = new FastColumnRenderableSeries_1.FastColumnRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.ImpulseSeries) {
            series = new FastImpulseRenderableSeries_1.FastImpulseRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.LineSeries) {
            series = new FastLineRenderableSeries_1.FastLineRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.MountainSeries) {
            series = new FastMountainRenderableSeries_1.FastMountainRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.ErrorBarsSeries) {
            series = new FastErrorBarsRenderableSeries_1.FastErrorBarsRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.OhlcSeries) {
            series = new FastOhlcRenderableSeries_1.FastOhlcRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.ScatterSeries) {
            series = new XyScatterRenderableSeries_1.XyScatterRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.SplineBandSeries) {
            series = new SplineBandRenderableSeries_1.SplineBandRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.SplineLineSeries) {
            series = new SplineLineRenderableSeries_1.SplineLineRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.SplineMountainSeries) {
            series = new SplineMountainRenderableSeries_1.SplineMountainRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.UniformHeatmapSeries) {
            series = new UniformHeatmapRenderableSeries_1.UniformHeatmapRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.NonUniformHeatmapSeries) {
            series = new NonUniformHeatmapRenderableSeries_1.NonUniformHeatmapRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.UniformContoursSeries) {
            series = new UniformContoursRenderableSeries_1.UniformContoursRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.TextSeries) {
            series = new FastTextRenderableSeries_1.FastTextRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.StackedColumnSeries) {
            series = new StackedColumnRenderableSeries_1.StackedColumnRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.StackedMountainSeries) {
            series = new StackedMountainRenderableSeries_1.StackedMountainRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.SmoothStackedMountainSeries) {
            series = new SmoothStackedMountainRenderableSeries_1.SmoothStackedMountainRenderableSeries(wasmContext, seriesDef.options);
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.StackedColumnCollection) {
            var col = new StackedColumnCollection_1.StackedColumnCollection(wasmContext, seriesDef.options);
            col.add.apply(col, (0, exports.buildSeries)(wasmContext, seriesDef.series, sharedData));
            series = col;
        }
        else if (seriesDef.type === SeriesType_1.ESeriesType.StackedMountainCollection) {
            var col = new StackedMountainCollection_1.StackedMountainCollection(wasmContext, seriesDef.options);
            col.add.apply(col, (0, exports.buildSeries)(wasmContext, seriesDef.series, sharedData));
            series = col;
        }
        if (series) {
            var dataSeries = getDataSeriesFromRenderableSeriesDefinition(wasmContext, seriesDef, sharedData);
            if (dataSeries) {
                series.dataSeries = dataSeries;
            }
        }
        if (series) {
            result.push(series);
        }
    }
    return result;
};
exports.buildSeries = buildSeries;
var getDataSeriesFromRenderableSeriesDefinition = function (wasmContext, renderableSeriesDefinition, sharedData) {
    var dataSeriesDefinition = getDataSeriesDefinition(renderableSeriesDefinition);
    if (!dataSeriesDefinition) {
        return undefined;
    }
    if (renderableSeriesDefinition.options &&
        "dataSeries" in renderableSeriesDefinition.options &&
        renderableSeriesDefinition.options.dataSeries &&
        dataSeriesDefinition.options &&
        "filter" in dataSeriesDefinition.options &&
        dataSeriesDefinition.options.filter) {
        return (0, buildDataSeries_1.buildDataSeries)(wasmContext, dataSeriesDefinition, sharedData, renderableSeriesDefinition.options.dataSeries);
    }
    return (0, buildDataSeries_1.buildDataSeries)(wasmContext, dataSeriesDefinition, sharedData);
};
